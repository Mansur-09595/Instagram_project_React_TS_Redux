import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersAction";
import { UsersState } from "../../../types/IData";


const initialState: UsersState = {
    users: [],
    isLoading: false,
    error: null,
  };
  
export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      });
      builder.addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
    },
  });

  export default userSlice.reducer;