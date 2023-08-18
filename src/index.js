import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { createStore } from "redux";
// Provider 는 store 의 state 에 접근 가능한 영역을 지정
import { Provider } from "react-redux";
import store from "./store/store";

// persist 적용(로컬스토리지 적용)
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const ps = persistStore(store);

// Redux DevTools 설치
// import { composeWithDevTools } from "redux-devtools-extension";
// import authReducer, { initialState } from "./modules/fbreducer";
//2. store 생성
//저장소 =  createStore(리듀서함수, state초기값, 개발도구 )
// const store = createStore(authReducer, initialState, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // store 의 state 를 사용할 범위 지정
  <Provider store={store}>
    {/* persist 적용 */}
    <PersistGate loading={null} persistor={ps}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
