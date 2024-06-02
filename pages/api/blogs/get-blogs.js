import BlogModel from "lib/models/blog.model";
import BlogCategoryModel from "lib/models/blogCategory.model";
import UserModel from "lib/models/user.model";
import mongoConnect from "pages/mongoose";

export default async function handler(req, res) {
    try {
        await mongoConnect();

        if (req.method === 'GET') {
            const blogs = await BlogModel.find({});
            
            // Fetch all category IDs from blogs
            const categoryIds = blogs.map(blog => blog.category);
            
            // Fetch all categories in one go
            const blogCategories = await BlogCategoryModel.find({ _id: { $in: categoryIds } });

            // Create a map for faster access to category titles
            const categoryMap = blogCategories.reduce((acc, category) => {
                acc[category._id.toString()] = category.title;
                return acc;
            }, {});


            const authorIds = blogs.map(blog => blog.author);
            
            const author = await UserModel.find({_id: { $in: authorIds }});

            const authorMap = author.reduce((acc, author) => {
                acc[author._id.toString()] = author.name;
              return acc;
                
            },{})

            const blogsData = blogs.map(blog => ({
                ...blog.toObject(),
                categoryTitle: categoryMap[blog.category.toString()],
                authorTitle: authorMap[blog.author.toString()],
            }));

console.log('blogsData',blogsData);

            res.status(200).json({ data: blogsData });
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
