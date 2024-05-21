import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTitle,
  setContent,
  setFile,
  submitPost,
} from "../features/PostSlice";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";

const CreatePost = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const boardId = queryParams.get("boardId");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, content, file, status } = useSelector((state) => state.posts);

  const handleFileChange = (event) => {
    dispatch(setFile(event.target.files[0]));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(submitPost({ boardId, title, content, file }))
      .then(unwrapResult)
      .then((post) => {
        navigate(`/post/${post.id}`);
      })
      .catch((error) => {
        console.error("Failed to create the post:", error);
        // 에러 처리
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        글 작성하기
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          margin="normal"
          label="제목"
          value={title}
          onChange={(e) => {
            dispatch(setTitle(e.target.value));
          }}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          label="내용"
          multiline
          rows={4}
          value={content}
          onChange={(e) => dispatch(setContent(e.target.value))}
        />
        <Button variant="contained" component="label" sx={{ mt: 2, mr: 2 }}>
          파일 첨부
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={status === "loading"}
        >
          {status === "loding" ? <CircularProgress size={24} /> : "작성하기"}
        </Button>
      </form>
    </Container>
  );
};

export default CreatePost;
