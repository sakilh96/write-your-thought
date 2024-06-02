// import mongoConnect from "pages/common/mongoose";
import mongoConnect from "pages/mongoose";
import UserModel from "lib/models/user.model";
import mongoose from "mongoose";
import fs from "fs";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  try {
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    // console.log("sessionsession", session);
    if (session) {
      if (req.method == "DELETE") {
        await mongoConnect();

        const objectId = new mongoose.mongo.ObjectId(req.query.id);
        const userData = await UserModel.findByIdAndDelete({ _id: objectId });

        if (!userData) {
          return res
            .status(404)
            .json({ status: false, message: "User not found" });
        }

        // Delete associated images
        if (userData.profile_pic) {
          deleteFile("public" + userData.profile_pic);
        }
        if (userData.cover_pic) {
          deleteFile("public" + userData.cover_pic);
        }

        return res
          .status(200)
          .json({ status: true, message: "User deleted successfully" });
      } else {
        return res
          .status(405)
          .json({ success: false, message: `Method not allowed` });
      }
    }else{
        return res
        .status(401)
        .json({ success: false, message: `Please login first` });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Failed to delete the data.",
      errorMsg: err.message,
      error: err,
    });
  }
}

function deleteFile(filePath) {
  try {
    fs.unlinkSync(filePath);
    console.log(`Deleted file: ${filePath}`);
  } catch (err) {
    console.error(`Error deleting file ${filePath}:`, err);
  }
}
