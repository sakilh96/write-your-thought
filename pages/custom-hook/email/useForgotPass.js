import { emailService } from "pages/services"; 



export default function useForgotPassEmail() {
  const useForgotPass = async (data) => {
    try {
        // console.log('data hook',data);
         const apiResponse = await emailService.sendForgotPasswordEmail(data);
         return apiResponse
    } catch (error) {
    //   console.error('Error adding user data:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  
  return { useForgotPass }
}
