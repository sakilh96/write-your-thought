
// import mongoConnect from "pages/common/mongoose";
import mongoConnect from "pages/mongoose";
import UserModel from "lib/models/user.model";
import bcrypt from "bcryptjs";
import { getToken } from "next-auth/jwt";
export default async function handler(req,res){
    try{
 
        if(req.method == 'POST'){
         
        await mongoConnect();
        const data = req.body;
        const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
        if(!session){
            return res.status(404).json({"success":false,"message":`Session expired`});
        }

        const user = await UserModel.findOne({_id:session._doc._id});
        const isPassMatched = await bcrypt.compare(data.password, user.password);
         if(data.email == user.email){
            return res.status(404).json({"success":false,"message":`You can not change email with the same email`});
        }
        else if(isPassMatched == true && data.email != user.email){
           await UserModel.findByIdAndUpdate({_id:session._doc._id},{ email: data.email})
            return res.status(200).json({"success":true,"message":`Email updated successfully`});
        }
        else if(isPassMatched == false){
            return res.status(404).json({"success":false,"message":`Password is not correct`});
        }
        // console.log('data',data.password, user.password,'isPassMatched',isPassMatched);
    
        }else{
            return res.status(405).json({"success":false,"message":`Method not allowed`});
        }

    }catch(err){
        if(err.code == 11000 && err.keyPattern.email == 1){
            return res.status(500).json({"success":false,"message":"Email is already in use"});
        }
      
        if (err.name === "ValidationError") {
            var errors = Object.keys(err?.errors ?? {}).map((e) => {
              return { param: e, msg: err?.errors?.[e]?.message ?? null };
            });
            return res.status(400).json({
              success: false,
              message: "Failed store the data.",
              errorMsg: err.message,
              error: { errors: errors },
            });
          }
      
          return res.status(400).json({
            success: false,
            message: "Failed store the data.",
            errorMsg: err.message,
            error: err,
          });
        
    }
}