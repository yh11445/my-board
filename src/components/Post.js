import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Container,
  CircularProgress,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../features/PostSlice";

const Post = () => {
  const { postId } = useParams(); // URL에서 postId 추출
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const post = useSelector((state) => state.posts.currentPost);
  const status = useSelector((state) => state.posts.status);

  const goToBoard = () => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page") || 1; // 페이지 번호가 없다면 기본값 1
    navigate(`/board?page=${page}`);
  };

  useEffect(() => {
    if (postId) {
      dispatch(fetchPost(postId));
    }
  }, [postId, dispatch]);

  if (status === "loading") {
    return <CircularProgress />;
  }

  if (!post) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <Container component="main" maxWidth="md">
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="h2" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {post.content}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Written by {post.writer} on{" "}
                {new Date(post.created_at).toLocaleDateString()}
              </Typography>
              {post.updated_at && (
                <Typography variant="caption" display="block">
                  Last updated on{" "}
                  {new Date(post.updated_at).toLocaleDateString()}
                </Typography>
              )}
            </CardContent>
            <CardContent>
              {post.images &&
                post.images.length > 0 &&
                post.images.map((image) => (
                  <img
                    key={image.id}
                    src={image.signedUrl}
                    alt={image.filename}
                    style={{ width: "100%", marginTop: "20px" }}
                  />
                ))}
            </CardContent>

            <CardActions>
              <Button variant="contained" color="primary" onClick={goToBoard}>
                목록으로
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Post;
