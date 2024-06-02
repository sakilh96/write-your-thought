import { blogService } from "pages/services";

export default function useGetBlog() {
  const blogData = async () => {
    try {
      const apiResponse = await blogService.getBlogs()
  // console.log('apiResponseapiResponse');
      return apiResponse
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  
  return { blogData }
}


