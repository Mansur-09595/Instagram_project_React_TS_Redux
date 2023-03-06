import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../../API";
import Cookies from "js-cookie";

export const getPosts = createAsyncThunk(
    "posts/get", 
    async function () {
        const res = await axios.get(`${baseURL}/posts`);        
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
      await axios.delete(`${baseURL}/posts/${_id}`, { 
        headers:{'Authorization': `Bearer ${Cookies.get('token')}`}, 
      });
      return _id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/update",
  async ({ _id, description }: { _id: string; description: string; }, thunkAPI) => {
    try {
      const res = await axios.patch(`${baseURL}/posts/${_id}`, {description: description}, { 
        headers:{'Authorization': `Bearer ${Cookies.get('token')}`} 
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/like",
  async (_id: string, thunkAPI) => {
    try {
      const res = await axios.post(`${baseURL}/posts/${_id}/like`, {}, { 
        headers:{'Authorization': `Bearer ${Cookies.get('token')}`} 
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const unlikePost = createAsyncThunk(
  "posts/unlike",
  async (_id: string, thunkAPI) => {
    try {
      const res = await axios.post(`${baseURL}/posts/${_id}/unlike`, {}, { 
        headers:{'Authorization': `Bearer ${Cookies.get('token')}`} 
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);