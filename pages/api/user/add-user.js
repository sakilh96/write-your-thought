import multiparty from 'multiparty';
import fs from 'fs';
import mongoConnect from 'pages/mongoose';
import UserModel from "lib/models/user.model";
import bcrypt from 'bcryptjs';
import sharp from 'sharp'; 

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, since we'll handle it manually
  },
};

export default async function handler(req, res) {

  if (req.method === 'POST') {
    await mongoConnect();

    const form = new multiparty.Form();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ success: false, message: 'Error parsing form data' });
      }

      try {
        // Check if profile pic and cover pic are uploaded
        let profilePicPathDb = null;
        let coverPicPathDb = null;

        if (files.profile_pic) {
          const profilePicFile = files.profile_pic[0];
          const profilePicPath = await resizeImage(profilePicFile.path, 'profile', profilePicFile.originalFilename);
          profilePicPathDb = await moveFile(profilePicPath, 'profile');
        }

        if (files.cover_pic) {
          const coverPicFile = files.cover_pic[0];
          const coverPicPath = await resizeImage(coverPicFile.path, 'cover', coverPicFile.originalFilename);
          coverPicPathDb = await moveFile(coverPicPath, 'cover');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(fields.password[0], 10); 

        // Save data to database
        const userData = {
          name: fields.name[0],
          email: fields.email[0],
          city: fields.city[0],
          role: fields.role[0],
          password: hashedPassword,
          bio: fields.bio[0],
          occupation: fields.occupation[0],
          phone: fields.phone[0],
          dob: fields.dob[0],
          gender: fields.gender[0],
          profile_pic: profilePicPathDb,
          cover_pic: coverPicPathDb,
        };

        await UserModel.create(userData);

        return res.status(200).json({ success: true, message: 'User added successfully' });
      } catch (error) {
        console.error('Error saving data:', error);
        return res.status(500).json({ success: false, message: 'Error saving data' });
      }
    });
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

async function resizeImage(imagePath, type, originalFilename) {
  // Get the original extension
  const extension = originalFilename.split('.').pop();

  // Determine target dimensions based on type
  let width, height;
  if (type === 'profile') {
    width = 256;
    height = 256;
  } else if (type === 'cover') {
    width = 1078;
    height = 162;
  }

  // Resize image to desired dimensions
  const resizedImagePath = `${imagePath.replace(/\.\w+$/, '')}_resized.${extension}`;
  await sharp(imagePath)
    .resize(width, height)
    .toFile(resizedImagePath);

  return resizedImagePath;
}

async function moveFile(filePath, type) {
  // Determine target directory based on type
  let targetDirectory;
  if (type === 'profile') {
    targetDirectory = 'public/uploads/profile_pic/';
  } else if (type === 'cover') {
    targetDirectory = 'public/uploads/cover_pic/';
  }

  // Generate random file name with date and time
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8); // Generate random string
  const fileName = `${timestamp}_${randomString}_${filePath.split('/').pop()}`;

  // Determine target path
  const targetPath = `${targetDirectory}${fileName}`;

  // Move file to desired location
  fs.renameSync(filePath, targetPath);

  return `/uploads/${type}_pic/${fileName}`;
}
