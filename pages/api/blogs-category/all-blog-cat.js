import BlogCategoryModel from "lib/models/blogCategory.model";
import { getToken } from "next-auth/jwt"
import mongoConnect from "pages/mongoose";


export default async function handler(req,res){
//   console.log(req.method);
if(req.method == 'GET'){
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });
    if(token){
        await mongoConnect();
        const data = await BlogCategoryModel.find({})
        res.status(200).json({success: true,'data':data})
    }else{
        return res
        .status(401)
        .json({ success: false, message: `Please login first` });
    }
  
   
}else{
    return res.status(405).json({'status':false,'message':'Method not allowed'})
}
}