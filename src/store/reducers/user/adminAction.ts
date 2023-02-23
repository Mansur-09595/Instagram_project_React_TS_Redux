import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../../API";
import { ILogin } from "../../../types/IData";
import Cookies from 'js-cookie';

export const signIn = createAsyncThunk<ILogin, { username: string; password: string }>(
    "token/getToken", 
    async function (credentials) {
    try {
        const res = await axios.post(`${baseURL}/user/sign-in`, credentials);
        console.log(res.data);
        return res.data;
    } catch (error) {
        throw error;
  }
});

export const checkIsAdmin = createAsyncThunk(
    'get/user',
    async function () {
      const token = Cookies.get('token');
      const res = await axios.get(`${baseURL}/user`, 
      {headers:{'Authorization': `Bearer ${token}`},
    });
      console.log(res)
      return res.data
    }
);

// export const getPosts = createAsyncThunk("users/upload", async function () {
//     const res = await axios.get(`${baseURL}/posts`);
//     console.log(res)
//     return res.data;
// });

export const signOut = createAsyncThunk<void, void>("token/deleteToken", async () => {
  Cookies.remove("token");
});