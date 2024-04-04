import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPostList = createAsyncThunk(
  "posts/fetchPostList",
  async ({ currentTab, currentPage }) => {
    const response = await axios.get(
      `http://localhost:4000/api/boards/${currentTab}?page=${currentPage}`
    );
    return response.data; // posts와 paginator를 반환합니다.
  }
);

export const fetchPost = createAsyncThunk("posts/fetchPost", async (postId) => {
  const response = await axios.get(`http://localhost:4000/api/posts/${postId}`);
  return response.data;
});

export const submitPost = createAsyncThunk(
  "posts/submit",
  async ({ boardId, title, content, file }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:4000/api/posts", {
        board_id: boardId,
        user_id: 1,
        title,
        content,
      });

      if (file) {
        const formData = new FormData();
        formData.append("files", file);
        await axios.post(
          `http://localhost:4000/api/posts/${response.data.id}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  title: "",
  content: "",
  file: null,

  currentTab: 1,
  currentPage: 1,
  currentPost: null,
  postList: [],
  paginator: {},
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.currentTab = action.payload;
      state.currentPage = 1; // 탭을 변경할 때마다 첫 페이지로 리셋
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setFile: (state, action) => {
      state.file = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPostList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.postList = action.payload.posts;
        state.paginator = action.payload.paginator;
      })
      .addCase(fetchPostList.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(fetchPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentPost = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(submitPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.title = "";
        state.content = "";
        state.file = null;
        // state.currentPost = action.payload;
      })
      .addCase(submitPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setTab, setPage, setTitle, setContent, setFile } =
  postSlice.actions;

export default postSlice.reducer;
