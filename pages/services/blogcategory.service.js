
import axios, { AxiosInstance } from 'axios'

export class BlogCategoryService {
    constructor(url) {
        this.instance = axios.create({
          baseURL: url
        });
      }

  getBlogCategory = async () => {
    const res = await this.instance.get(`/api/blogs-category/all-blog-cat`)
    return res
  }

  deleteBlogCategory = async (id) => {
    const res = await this.instance.delete(`/api/blogs-category/delete-blog/${id}`)
    return res
  }

  addBlogCategory = async (data) => {
    const res = await this.instance.post(`/api/blogs-category/add-blog/`,data)
    return res
  }

  onedBlogCategory = async (id) => {
    // console.log('idid',id);
    const res = await this.instance.get(`/api/blogs-category/one-cat/${id}`)
    return res
  }

  editBlogCategory = async (id,data) => {
    const res = await this.instance.put(`/api/blogs-category/edit-blog/${id}`,data)
    return res
  }


}

