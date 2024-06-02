import BlogCategoryModel from "lib/models/blogCategory.model";
import { getToken } from "next-auth/jwt"
import mongoConnect from "pages/mongoose";


export default async function handler(req,res){
//   console.log(req.method);
if(req.method == 'PUT'){
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });
    if(token){
        await mongoConnect();
        // console.log('req',req.query.id);
        const title = req.body.title;
        const edited_by = token._doc._id;
         const exitCat = await BlogCategoryModel.find({title: title, _id: {$ne: req.query.id}})
        // console.log('exitCat',exitCat);
        if (exitCat.length > 0) {
            return res.status(400).json({ error: 'Category with this title already exists' });
        } else {
            const updateData ={
                title: title,
                edited_by: edited_by,
            }
           await BlogCategoryModel.findByIdAndUpdate(req.query.id,updateData);
           res.status(200).json({success: true,'message':'Category updated successfully'})
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