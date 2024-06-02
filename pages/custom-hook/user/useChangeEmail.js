import { userService } from "pages/services"; 



export default function useChangeEmail() {
  const useUpdateEmail = async (data) => {
    try {
      const apiResponse = await userService.changeEmail(data)
   
      return apiResponse
    } catch (error) {
      console.error('Error adding user data:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  
  return { useUpdateEmail }
}
