import { getToken } from "next-auth/jwt";
import multiparty from "multiparty"
import sharp from 'sharp'; 
import fs, { unlinkSync } from 'fs';
import BlogModel from "lib/models/blog.model";
import mongoConnect from "pages/mongoose";

export const config = {
    api: {
        bodyParser: false,
    }
}

export default async function handler(req, res) {
    try {
        if (req.method === 'PUT') {
            const token = await getToken({
                req,
                secret: process.env.NEXTAUTH_SECRET
            });
            if (token) {
                await mongoConnect();
              const form  =  new multiparty.Form();
              form.parse(req, async (err, fields, files) => {
                if(err){
                    return res.status(500).json({ success: false, message: 'Error parsing form data' });
                }

                try{

                    const existBlog = await BlogModel.find({title: fields.title[0], _id: {$ne:  req.query.id}});
                    console.log('existBlog',existBlog.length);

                   if(existBlog.length > 0){
                     res.status(500).json({ status: true, message: "There is already a blog with the same name" });
                   }else{
                    let blogPicPathDb = null;

                    if (files.image) {
                    const blogPicFile = files.image[0];
                    const blogPicPath = await resizeImage(blogPicFile.path, 'image', blogPicFile.originalFilename);
                    blogPicPathDb = await moveFile(blogPicPath, 'image');
                    }

                    const blog = await BlogModel.find({_id: req.query.id});

               
                    // const data = {
                    //     title: fields.title[0],
                    //     content: fields.content[0],
                    //     image: blogPicPathDb,
                    //     author: token._doc._id,
                    //     category: fields.category[0],
                    // }

                    const blogdata = {
                      title: fields.title ? fields.title[0] : '',
                      content: fields.content ? fields.content[0] : '',
                      category: fields.category ? fields.category[0] : '',
                  }

                   blogdata.image = blogPicPathDb != null  ? blogPicPathDb : blog[0].image;
                   if(blogPicPathDb && blog[0].image){
                    await unlinkSync('public'+ blog[0].image);
                  }
                  const update = await BlogModel.findByIdAndUpdate( req.query.id,blogdata);
                  console.log(blog[0].image );
                 
                    res.status(200).json({ status: true, message: "Blog updated successfully" });
                   }
                   

                } catch(err){
                    console.log('err',err);
                    res.status(500).json({ status: true, message: "Server error" });
                }
               
              })

                // console.log('reqreq',req.body);
            } else {
                res.status(405).json({ status: true, message: "Please login first" });
            }
        } else {
            res.status(405).json({ status: true, message: "Method not allowed" });
        }
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ msg: "Internal server error" });
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
    if (type === 'image') {
      targetDirectory = 'public/uploads/blogs/';
    } 
  
    // Generate random file name with date and time
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8); // Generate random string
    const fileName = `${timestamp}_${randomString}_${filePath.split('/').pop()}`;
  // console.log('fileName',fileName);
    // Determine target path
    const targetPath = `${targetDirectory}${fileName}`;
  
    // Move file to desired location
    fs.renameSync(filePath, targetPath);
  
    return `/uploads/blogs/${fileName}`;
  }
  
