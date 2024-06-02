// import mongoConnect from "pages/common/mongoose";
import mongoConnect from "pages/mongoose";
import BlogCategoryModel from "lib/models/blogCategory.model";
import mongoose from "mongoose";
import { getToken } from "next-auth/jwt";
export default async function handler(req,res){
   try{
    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
    //   console.log("sessionsession", session);
      if (session) {
    if(req.method == 'GET'){
        await mongoConnect();
        const id = new mongoose.mongo.ObjectId(req.query.id);
        const cat = await BlogCategoryModel.findById(id);
        // console.log('cat',cat);
        res.status(200).json({"success": true, "data":cat})
    }else{
        return res.status(405).json({"success":false,"message":`Method not allowed`});

    }
        }else{
            return res
            .status(401)
            .json({ success: false, message: `Please login first` });
        }
    
   }catch(err){
    console.log('eee',err);
   }
}