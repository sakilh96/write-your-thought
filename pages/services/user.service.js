
import axios, { AxiosInstance } from 'axios'

export class UserService {
    constructor(url) {
        this.instance = axios.create({
          baseURL: url
        });
      }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getUser = async () => {
    const res = await this.instance.get(`/api/user/get-user`)
    return res
  }

  addUser = async (data) => {
    
    const res = await this.instance.post(`/api/user/add-user`,data);
    // console.log('resres',res);
    // return res;
  
  }

  oneUser = async (id) => {
  
    const res = await this.instance.get(`/api/user/one-user/${id}`);
    // const res = await this.instance.get(`/api/user/one-user/65ddec1f5146d31b22ba1bad`);
 
    return res;
  
  }

  updateUser = async (id,data) => {
    
    const res = await this.instance.put(`/api/user/update-user/${id}`,data);
    // console.log('resres',res);
    return res;
    
  }

   deleteUser = async (id) => {
   
    const res = await this.instance.delete(`/api/user/delete-user/${id}`);
 
  }

  changeEmail = async (data) => {
    
    const res = await this.instance.post(`/api/user/change-email`,data);
    
  }

  changePassword = async (data) => {
    
    const res = await this.instance.post(`/api/user/change-password`,data);
    
  }




}

