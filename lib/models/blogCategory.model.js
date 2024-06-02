import { models, model, Schema } from "mongoose";

const BlogCategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    added_by: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    edited_by: {
      type: Schema.Types.ObjectId,
      ref: "users",
    }
  },
  {
    timestamps: true,
  }
);

const BlogCategoryModel = models.BlogCategory || model("BlogCategory", BlogCategorySchema);

export default BlogCategoryModel;
