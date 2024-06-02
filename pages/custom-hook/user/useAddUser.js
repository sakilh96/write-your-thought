import { userService } from "pages/services"; 



export default function useAddUsers() {
  const userAddData = async (data) => {
    try {
      const apiResponse = await userService.addUser(data)
  
      return apiResponse
    } catch (error) {
      console.error('Error adding user data:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  
  return { userAddData }
}
