import BlogCategoryModel from "lib/models/blogCategory.model";
import { getToken } from "next-auth/jwt"
import mongoConnect from "pages/mongoose";


export default async function handler(req,res){
//   console.log(req.method);
if(req.method == 'POST'){
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });
    if(token){
        await mongoConnect();
        const title = req.body.title;
        const added_by = token._doc._id;
        const existCat = await BlogCategoryModel.find({title: title});
        if(existCat.length == 0){
         await BlogCategoryModel.create({title:title,added_by:added_by })
        res.status(200).json({success: true,'message':'Category created successfully'})
        }else{
            res.status(401).json({success: false,'message':'This categoty has already existed'})
        }
       

   
    }else{
        return res
        .status(401)
        .json({ success: false, message: `Please login first` });
    }
  
   
}else{
    return res.status(405).json({'status':false,'message':'Method not allowed'})
}
}