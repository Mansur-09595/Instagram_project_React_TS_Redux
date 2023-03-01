import { createAsyncThunk } from "@reduxjs/toolkit";
import { attachAuthToken, baseService, fillToken } from "../../../API";
import { ILogin } from "../../../types/IData";
import Cookies from 'js-cookie';

export const checkIsAdmin = createAsyncThunk(
    'admin/isAdmin',
    async function (_, thunkAPI) {
      const token = Cookies.get('token');
      attachAuthToken( token as string );
      try {
        await baseService.get("/user")
      } catch (error) {
        return thunkAPI.rejectWithValue(error)
      }
    }
);

export const signIn = createAsyncThunk<ILogin, { username: string; password: string }>(
  "token/getToken", 
  async function (credentials, thunkAPI) {
  try {
      const { data } = await baseService.post("/user/sign-in", credentials);
      attachAuthToken(data.token)
      fillToken(data.token)
      Cookies.set('username', credentials.username); // store username in cookie
      return { ...data, username: credentials.username };
  } catch (error) {
      throw thunkAPI.rejectWithValue(error);
  }
});

export const signOut = createAsyncThunk<void, void>("token/deleteToken", async () => {
  Cookies.remove("token");
});