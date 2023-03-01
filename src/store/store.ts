import { configureStore, combineReducers } from "@reduxjs/toolkit";
import adminSlice from "./reducers/user/adminSlice";
import todoSlice  from "./reducers/posts/postSlice";
import userSlice  from "./reducers/users/usersSlice";


const rootReducer = combineReducers({
    admin: adminSlice,
    posts: todoSlice,
    users: userSlice,
})

export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;