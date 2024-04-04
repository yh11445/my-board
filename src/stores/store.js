import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postSlice";
// import createPostReducer from "../features/createPostSlice";

export default configureStore({
  reducer: {
    posts: postReducer,
    // createPost: createPostReducer,
  },
});
