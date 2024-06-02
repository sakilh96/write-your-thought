// pages/api/user/get-user.js
import UserModel from "lib/models/user.model"; // Adjust the path accordingly
import mongoConnect from "pages/mongoose";
import { getToken } from "next-auth/jwt";
export default async function handler(req, res) {
    try {
        const session = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
          });
        //   console.log("sessionsession", session);
          if (session) {
        if(req.method == 'GET'){
            await mongoConnect(); // Ensure MongoDB connection is established
            const users = await UserModel.find({}).sort({createdAt: -1}); // Fetch all users from the database
            return res.status(200).json(users); // Return users as JSON response
        }else{
            return res.status(405).json({'status':false,'message':'Method not allowed'})
        }

    }else{
        return res
        .status(401)
        .json({ success: false, message: `Please login first` });
    }
     
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Internal Server Error' }); // Handle errors
    }
}
