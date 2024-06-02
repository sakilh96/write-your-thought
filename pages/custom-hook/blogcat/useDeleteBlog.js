import { blogCategoryService } from "pages/services";

export default function useDeleteBlog() {
  const useDeleteData = async (id) => {
    try {
      const apiResponse = await blogCategoryService.deleteBlogCategory(id)
  // console.log('apiResponseapiResponse');
      return apiResponse
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  
  return { useDeleteData }
}


