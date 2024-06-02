import BlogModel from "lib/models/blog.model";
import { getToken } from "next-auth/jwt"
import mongoConnect from "pages/mongoose";
import fs from 'fs';

export default async function handler(req,res){
//   console.log(req.method);
if(req.method == 'DELETE'){
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });
    if(token){
        await mongoConnect();
        const data = await BlogModel.find({_id:req.query.id});
        console.log('data',data);
           await BlogModel.findByIdAndDelete(req.query.id);
        if(data[0].image){
            fs.unlinkSync('public' + data[0].image);
        }
           res.status(200).json({success: true,'message':'Blog deleted successfully'})
    }else{
        return res
        .status(401)
        .json({ success: false, message: `Please login first` });
    }
  
   
}else{
    return res.status(405).json({'status':false,'message':'Method not allowed'})
}
}