import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signIn, checkIsAdmin, signOut  } from "./adminAction";
import { ILogin, postState } from "../../../types/IData";
import Cookies from 'js-cookie';


// const initialState: loginState = {
//   token: null,
//   isAdmin: false,
//   isLoading: false,
//   error: null,
// };

const initialState: postState = {
  users: [],
  posts: [],
  currentUser: {
    token: Cookies.get('token') || '',
    username: "",
    _id: "",
    avatar: "",
  },
  isAdmin: false,
  isLoading: false,
  // error: null,
};

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
    })
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.isAdmin = false;
      // state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(checkIsAdmin.pending, (state, action) => {
      state.isLoading = true
      // state.error = action.error.message || "Something went wrong";
    })
    builder.addCase(checkIsAdmin.fulfilled,(state, action: PayloadAction<ILogin[]>) => { 
      state.isLoading = false
      state.isAdmin = true
      state.users = action.payload
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
