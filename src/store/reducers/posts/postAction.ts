import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../../API";
import Cookies from "js-cookie";

export const getPosts = createAsyncThunk(
    "posts/get", 
    async function () {
        const res = await axios.get(`${baseURL}/posts`);
        console.log(res.data);
        
        return res.data;
});

export const addPosts = createAsyncThunk(
    "posts/post",
    async function ({ description, image }: { description: string; image: File }, thunkAPI) {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("image", image);

      try {
        const res = await axios.post(`${baseURL}/posts`, formData, { 
          headers:{'Authorization': `Bearer ${Cookies.get('token')}`} 
        });
        return res.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const removePosts = createAsyncThunk(
  "posts/delete",
  async (_id: string, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${baseURL}/posts/${_id}`, { 
        headers:{'Authorization': `Bearer ${Cookies.get('token')}`}, 
      });
      console.log(res);
      return _id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);