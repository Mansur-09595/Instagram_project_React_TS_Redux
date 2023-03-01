import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseService } from "../../../API";

export const fetchUsers = createAsyncThunk(
    "users/fetchAll", 
    async function () {
    try {
      const response = await baseService.get("/users");
      return response.data;
    } catch (error) {
      throw error;
    }
});