// import mongoConnect from "pages/common/mongoose";
import mongoConnect from "pages/mongoose";
import UserModel from "lib/models/user.model";
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
        const user = await UserModel.findById(id);
        // console.log('user',user);
        res.status(200).json({"success": true, "data":user})
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