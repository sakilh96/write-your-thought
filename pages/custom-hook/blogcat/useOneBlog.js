import { blogCategoryService } from "pages/services";

export default function useOneBlog() {
  const blogOneCatData = async (id) => {
    try {
      const apiResponse = await blogCategoryService.onedBlogCategory(id)
  // console.log('apiResponseapiResponse');
      return apiResponse
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  
  return { blogOneCatData }
}


