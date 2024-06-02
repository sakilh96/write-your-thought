import { blogCategoryService } from "pages/services";

export default function useAddBlog() {
  const useAddData = async (data) => {
    try {
      const apiResponse = await blogCategoryService.addBlogCategory(data)
  // console.log('apiResponseapiResponse');
      return apiResponse
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  
  return { useAddData }
}


