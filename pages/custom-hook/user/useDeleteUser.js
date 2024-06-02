import { userService } from "pages/services"; 



export default function useDeleteUser() {
  const useDeleteData = async (id) => {
    try {
      const apiResponse = await userService.deleteUser(id)
      
      return apiResponse
    } catch (error) {
      console.error('Error adding user data:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  
  return { useDeleteData }
}
