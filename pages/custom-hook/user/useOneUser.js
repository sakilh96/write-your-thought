import { userService } from "pages/services"; 

export default function useOneUser() {
  const useroneData = async (id) => {
    try {
      const apiResponse = await userService.oneUser(id)
      
      return apiResponse
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  
  return { useroneData }
}


