import { createSlice } from "@reduxjs/toolkit";
import { signIn, checkIsAdmin, signOut  } from "./adminAction";
import { postState } from "../../../types/IData";
import Cookies from 'js-cookie';

const initialState: postState = {
  users: [],
  posts: [],
  currentUser: {
    token: Cookies.get('token') || '',
    username: Cookies.get('username') || '',
    _id: Cookies.get('_id') || '',
    avatar: Cookies.get('avatar') || '',
  },
  isAdmin: false,
  isLoading: false,
  error: null,
};

console.log(initialState.currentUser.username);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //postSignIn
    builder.addCase(signIn.pending, (state) => {
        state.isLoading = true;
    })
    builder.addCase(signIn.fulfilled,(state, action) => { 
        state.isLoading = false;
        state.isAdmin = true;
        state.currentUser = action.payload
        Cookies.set('token', action.payload.token, { expires: 20 })
        Cookies.set('avatar', action.payload.avatar)
    })
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.isAdmin = false;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(checkIsAdmin.pending, (state) => {
      state.isLoading = true
      state.error = "Something went wrong";
    })
    builder.addCase(checkIsAdmin.fulfilled,(state) => { 
      state.isLoading = false
      state.isAdmin = true
    })
    builder.addCase(signOut.fulfilled, (state) => {
      state.isAdmin = false;
      state.currentUser = {
        token: "",
        username: "",
        _id: "",
        avatar: "",
      };
    });
  }
});

export default adminSlice.reducer;
