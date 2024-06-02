import multiparty from 'multiparty';
import fs from 'fs';
import mongoConnect from "pages/common/mongoose";
import UserModel from "lib/models/user.model";
import bcrypt from 'bcryptjs';

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
        // Handle file uploads
        const profilePicFile = files.profile_pic[0];
        const coverPicFile = files.cover_pic[0];

       // Generate random file names with date and time
       const profilePicFileName = generateFileName(profilePicFile.originalFilename);
       const coverPicFileName = generateFileName(coverPicFile.originalFilename);

       // Determine file paths
       const profilePicPath = `public/uploads/profile_pic/${profilePicFileName}`;
       const coverPicPath = `public/uploads/cover_pic/${coverPicFileName}`;

        // Move files to desired location
        fs.renameSync(profilePicFile.path, profilePicPath);
        fs.renameSync(coverPicFile.path, coverPicPath);

        // Hash the password
        const hashedPassword = await bcrypt.hash(fields.password[0], 10); 

        // Save data to database
        const userData = {
          name: fields.name[0],
          email: fields.email[0],
          city: fields.city[0],
          type: fields.type[0],
          password: hashedPassword,
          bio: fields.bio[0],
          occupation: fields.occupation[0],
          phone: fields.phone[0],
          dob: fields.dob[0],
          gender: fields.gender[0],
       
          profile_pic: profilePicPath,
          cover_pic: coverPicPath,
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

function generateFileName(originalFilename) {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8); // Generate random string
  const fileName = `${timestamp}_${randomString}_${originalFilename}`;
  return fileName;
}
