import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
// Provider 는 store 의 state 에 접근 가능한 영역을 지정
import { Provider } from "react-redux";

// 1. Redux Store 에서 관리할 초기 객체
const initialState = {
  user: null, // fb 로그인 정보 {email:"", uid:"",nickName:""}
  isAuthReady: false, // 로그인 상태 체크
  errMessage: "", // 에러 메시지
  // kakaoProfile: null, //kakao 저장 정보
};
//2. Reducer 함수 작성
// dispatch 에 의해 전달된 액션을 이용하여 state 를 업데이트

const authReducer = (state, action) => {
  // console.log(action.type, action.payload);
  // console.log("리듀서함수 : ", action);
  // action 은 반드시 형태가 {type: "구분자"}
  switch (action.type) {
    case "login":
      // state 를 갱신한다.
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };

    case "isAuthReady":
      return { ...state, user: action.payload, isAuthReady: true };

    case "updateName":
      return { ...state, user: action.payload };

    case "updateEmail":
      return { ...state, user: action.payload };

    case "userDelete":
      return { ...state, user: null };

    case "isError":
      return { ...state, errMessage: action.payload };

    case "kakaoLogin":
      return { ...state, kakaoProfile: action.payload };

    case "kakaoLogout":
      return { ...state, kakaoProfile: null };

    case "kakaoOut":
      return { ...state, kakaoProfile: null };

    default:
      // 그대로 돌려준다.
      return state;
  }
};
//2. store 생성
// createStore(리듀서함수, state초기값 )
const store = createStore(authReducer, initialState);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // store 의 state 를 사용할 범위 지정
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
