import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/PostSlice";

export default configureStore({
  reducer: {
    posts: postReducer,
  },
});
