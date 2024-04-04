import { Outlet, Route, Routes } from "react-router-dom";
import Board from "./components/Board";
import Login from "./components/Login";
import Post from "./components/Post";
import CreatePost from "./components/CreatePost";

function App() {
  return (
    <Routes>
      <Route element={<BasicWrap />}>
        <Route path="/" element={<Login />} />
        <Route path="/board" element={<Board />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/post/create" element={<CreatePost />} />
      </Route>
    </Routes>
  );
}

const BasicWrap = () => {
  return (
    <>
      {/* <Header /> */}
      {/* <SideBar /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default App;
