import { EmailService } from "./email.service";
import { UserService } from "./user.service";
// import { BlogCatService } from "./blogcategory.service";
import { BlogCategoryService } from "./blogcategory.service";
import { BlogService } from "./blogs.service";


// const baseUrl = process.env.API_BASE_URL;
const baseUrl = 'http://localhost:3000/';
export const userService = new UserService(baseUrl);
export const emailService = new EmailService(baseUrl);
export const blogCategoryService = new BlogCategoryService(baseUrl);
export const blogService = new BlogService(baseUrl);

