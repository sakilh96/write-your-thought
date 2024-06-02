import { blogCategoryService } from "pages/services";

export default function useEditBlog() {
  const useEditData = async (id,data) => {
    try {
      const apiResponse = await blogCategoryService.editBlogCategory(id,data)
  // console.log('apiResponseapiResponse');
      return apiResponse
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  
  return { useEditData }
}


