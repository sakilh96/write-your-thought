
import axios, { AxiosInstance } from 'axios'

export class EmailService {
    constructor(url) {
        this.instance = axios.create({
          baseURL: url
        });
      }

  sendForgotPasswordEmail = async (data) => {
    
    const res = await this.instance.post(`/api/email/send-email`,data);
    console.log('data ser',data);
    return res;
  
  }

}

