import { models, model, Schema } from "mongoose";

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    image: {type: String},
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    published_at: {
      type: Date,
    },
 
    edited_by: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    category:{
      type: Schema.Types.ObjectId,
      ref:"blogcategories"
    }
   
  },
  {
    timestamps: true,
  }
);

const BlogModel = models.Blog || model("Blog", BlogSchema);

export default BlogModel;
