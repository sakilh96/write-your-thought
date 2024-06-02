import { userService } from "pages/services"; 



export default function useEditUser() {
  const useUpdateData = async (id,data) => {
    try {
      const apiResponse = await userService.updateUser(id,data)
   
      return apiResponse
    } catch (error) {
      console.error('Error adding user data:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  
  return { useUpdateData }
}
