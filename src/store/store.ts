import { configureStore, combineReducers } from "@reduxjs/toolkit";
import adminSlice from "./reducers/user/adminSlice";
import todoSlice  from "./reducers/posts/postSlice";

const rootReducer = combineReducers({
    admin: adminSlice,
    posts: todoSlice,
})

export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;