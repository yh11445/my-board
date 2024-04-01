import { createSlice } from "@reduxjs/toolkit";

export const boardSliceKey = "board";

const boardSlice = createSlice({
  name: boardSliceKey,
  initialState: {
    board: [
      {
        id: 1,
        title: "title1",
        content: "content1",
      },
      {
        id: 2,
        title: "title2",
        content: "content2",
      },
      {
        id: 3,
        title: "title3",
        content: "content3",
      },
    ],
  },
  reducers: {
    setBoard: (state, action) => {
      state.board = action.payload;
    },
    getBoard: (state) => {
      return state.board;
    },
    clearBoard: (state) => {
      state.board = [];
    },
  },
});

export const { setBoard, getBoard, clearBoard } = boardSlice.actions;

export default boardSlice.reducer;
