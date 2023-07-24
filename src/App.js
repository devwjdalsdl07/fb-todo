import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";
import NotFound from "./pages/NotFound";
import MyPage from "./pages/MyPage";
import { useEffect, useState } from "react";
import Schedule from "./pages/Schedule";
import Upload from "./pages/Upload";
import TodoChart from "./pages/TodoChart";
import { useAuthContext } from "./hooks/useFirebase";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { appAuth } from "./firebase/config";

function App() {
  // console.log("App 랜더링");
  // 추후에 Redux/Recoil state 로 관리 필요
  // const { isAuthReady, user, errMessage, dispatch } = useAuthContext();
  // 1. store 에 저장된 state 를 읽어온다
  // const isAuthReady = useSelector(state => state.isAuthReady);
  // const user = useSelector(state => state.user);
  // const errMessage = useSelector(state => state.errMessage);
  // const kakaoProfile = useSelector(state => state.kakaoProfile);
  const { isAuthReady, user, errMessage } = useSelector(state => state);
  // 2. store 에 저장된 state 를 업데이트(action 생성)
  const dispatch = useDispatch();
  // FB 인증 웹브라우저 새로 고침 처리
  useEffect(() => {
    onAuthStateChanged(appAuth, user => {
      // console.log("onAuthStateChanged : ", user);
      dispatch({ type: "isAuthReady", payload: user });
    });
  }, []);

  // 에러 모달
  const error = msg => {
    Modal.error({
      title: "Firebase Warning",
      content: errMessage,
      onok: handleOk,
    });
  };

  useEffect(() => {
    if (errMessage !== "") {
      error(errMessage);
    }
  }, [errMessage]);

  const handleOk = () => {
    dispatch({ type: "isError", payload: "" });
  };
  // const [isModalOpen, setIsModalOpen] = useState(true);

  // const handleOk = () => {
  //   dispatch({ type: "isError", payload: "" });
  // };
  // const handleCancel = () => {
  //   dispatch({ type: "isError", payload: "" });
  // };

  return (
    <>
      {isAuthReady ? (
        <div className="w-screen h-screen bg-blue-300 overflow-x-hidden">
          <Header />
          <div className="container mx-auto h-full">
            <Routes>
              {/* Navigate 를 이용한 강제 이동 */}
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/login"
                element={user ? <Navigate to="/home" /> : <Login />}
              />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/todo"
                element={user ? <Todo /> : <Navigate to="/login" />}
              />
              <Route
                path="/mypage"
                element={user ? <MyPage /> : <Navigate to="/login" />}
              />
              <Route path="/Schedule" element={<Schedule />}></Route>
              <Route path="/chart" element={<TodoChart />}></Route>
              <Route path="/Upload" element={<Upload />}></Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default App;
