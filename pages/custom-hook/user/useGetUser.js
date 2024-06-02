import { userService } from "pages/services"; 

export default function useGetUsers() {
  const userData = async () => {
    try {
      const apiResponse = await userService.getUser()
  
      return apiResponse
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  
  return { userData }
}


