import { models, model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    city: { type: String },
    role: { type: String, enum:['Writer','Admin','Sub-Admin'], default: 'Writer' },
    password: { type: String, required: true },
    bio: { type: String },
    occupation: { type: String },
    phone: { type: String },
    dob: { type: String },
    profile_pic: {type: String},
    cover_pic: {type: String},
  
    gender: { type: String },
   
  },
  {
    timestamps: true,
  }
);

const UserModel = models.User || model("User", UserSchema);

export default UserModel;
