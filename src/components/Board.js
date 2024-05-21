import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostList, setTab, setPage } from "../features/PostSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Button,
  CircularProgress,
} from "@mui/material";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

const Board = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentTab, currentPage, postList, paginator, status } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPostList({ currentTab, currentPage }));
  }, [dispatch, currentTab, currentPage]);

  const handleTabChange = (event, newValue) => {
    dispatch(setTab(newValue + 1));
  };

  const handlePageClick = (page) => {
    dispatch(setPage(page));
  };

  const goToPost = (postId) => {
    axiosInstance
      .get(`/posts/${postId}`)
      .then((response) => {
        // 데이터 처리 및 페이지 이동
        navigate(`/post/${postId}?page=${currentPage}`);
      })
      .catch((error) => {
        console.error("Post fetch failed:", error);
        // 에러 처리 로직 (예: 에러 페이지로 리다이렉트)
      });
  };

  const goToCreatePost = () => {
    navigate(`/post/create?boardId=${currentTab}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Tabs
        value={currentTab > 0 ? currentTab - 1 : 0} // 이 라인 없으면 오류남 원인 모름
        onChange={handleTabChange}
        aria-label="board tabs"
      >
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
      </Tabs>
      <Button
        variant="contained"
        onClick={() => goToCreatePost()}
        style={{ margin: "5px" }}
      >
        글 작성하기
      </Button>
      {status === "loading" ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>생성일시</TableCell>
                <TableCell>수정일시</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {postList.map((post) => (
                <TableRow
                  key={post.id}
                  onClick={() => goToPost(post.id)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell component="th" scope="row">
                    {post.id}
                  </TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>
                    {format(new Date(post.created_at), "yyyy-MM-dd HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(post.updated_at), "yyyy-MM-dd HH:mm:ss")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div>
        {paginator.hasPrev && (
          <Button
            variant="contained"
            onClick={() => handlePageClick(paginator.prevPage)}
            style={{ margin: "5px" }}
          >
            Prev
          </Button>
        )}
        {paginator.pageList &&
          paginator.pageList.map((page) => (
            <Button
              key={page}
              variant="outlined"
              onClick={() => handlePageClick(page)}
              disabled={page === paginator.page}
              style={{ margin: "5px" }}
            >
              {page}
            </Button>
          ))}
        {paginator.hasNext && (
          <Button
            variant="contained"
            onClick={() => handlePageClick(paginator.nextPage)}
            style={{ margin: "5px" }}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Board;
