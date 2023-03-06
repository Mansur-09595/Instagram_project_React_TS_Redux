import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPosts, addPosts, removePosts, updatePost, likePost, unlikePost } from "./postAction";
import { instagramState } from "../../../types/IData";
import { IPosts } from "../../../types/IData";


const initialState: instagramState = {
    posts: [],
    isLoading: false,
    isAdmin: false,
    error: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getTodo
    builder.addCase(getPosts.pending, (state) => {
        state.isLoading = true
    })
    builder.addCase(getPosts.fulfilled,(state, action: PayloadAction<IPosts[]>) => { 
        state.isLoading = false
        state.posts = action.payload
    })
    builder.addCase(getPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Something went wrong";
    });
    //addPosts
    builder.addCase(addPosts.pending, (state) => {
        state.isLoading = true
    })
    builder.addCase(addPosts.fulfilled, (state, action: PayloadAction<IPosts>) => {
        state.isLoading = false
        // state.todos.unshift(action.payload);
        state.posts = [...state.posts, action.payload];
    });
    builder.addCase(addPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Something went wrong";
    });
    //deleteTodo
    builder.addCase(removePosts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(removePosts.fulfilled, (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    });
    builder.addCase(removePosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Something went wrong";
    });
    //updateTodo
    builder.addCase(updatePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePost.fulfilled, (state, action: PayloadAction<IPosts>) => {
      state.isLoading = false
      state.posts = state.posts.map(post => {
        if (post._id === action.payload._id) {
          return action.payload;
        }
        return post;
      });
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Something went wrong";
    });
    //likedPost
    builder.addCase(likePost.fulfilled, (state, action) => {
      const likedPost = state.posts.find(post => post._id === action.payload._id);
      if (likedPost) {
        likedPost.likes += 1;
      }
    })
    builder.addCase(unlikePost.fulfilled, (state, action) => {
      const unlikedPost = state.posts.find(post => post._id === action.payload._id);
      if (unlikedPost) {
        unlikedPost.likes -= 1;
      }
    });
  }
});

export default todoSlice.reducer;
