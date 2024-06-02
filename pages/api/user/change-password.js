
// import mongoConnect from "pages/common/mongoose";
import mongoConnect from "pages/mongoose";
import UserModel from "lib/models/user.model";
import bcrypt from 'bcryptjs';
import { getToken } from "next-auth/jwt";
export default async function handler(req,res){
    try{
 
        if(req.method == 'POST'){
         
        await mongoConnect();
        const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if(!session){
            return res.status(404).json({"success":false,"message":`Session expired`});
        }
        const userId = session._doc._id;
        const data = req.body;
        const user = await UserModel.findOne({_id:userId});
        const isPasswordmatched = await bcrypt.compare(data.cp,user.password);
        if(isPasswordmatched ==  false){
          res.status(404).json({message: 'Current password is incorrect'});
        }
        else if(data.np !=  data.cnp){
          res.status(400).json({message: 'New password is not matched with Confirm password'});
        }
        else{
          const hashpassword = await bcrypt.hash(data.cnp, 10);

          await UserModel.findByIdAndUpdate({_id:userId},{password:hashpassword})
         console.log('data.cp',data.np,'data.np',data.np,'data.cnp',data.cnp);
          return res.status(200).json({"success":true,"message":`Password changed successfully`});
        }

      
        }else{
            return res.status(405).json({"success":false,"message":`Method not allowed`});
        }

    }catch(err){
          return res.status(400).json({
            success: false,
            message: "Failed store the data.",
            errorMsg: err.message,
            error: err,
          });
        
    }
}