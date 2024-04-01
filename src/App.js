import { useDispatch, useSelector } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import { getBoard, setBoard } from "./stores/board";
import Login from "./components/Login";

function App() {
  return (
    <Routes>
      <Route element={<BasicWrap />}>
        <Route path="/" element={<Login />} />
        <Route path="/sub" element={<SubPage />} />
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

const SubPage = () => {
  const dispatch = useDispatch();
  const board = useSelector(getBoard);
  console.log(board);
  return (
    <>
      <button
        onClick={() => {
          dispatch(setBoard([{ id: 1, title: "title1", content: "content1" }]));
        }}
      >
        click
      </button>
    </>
  );
};
export default App;
