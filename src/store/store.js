import { configureStore } from "@reduxjs/toolkit";
import fbAuthSlice from "../reducers/fbAuthSlice";
// Saga 관련
import createSagaMiddleware from "@redux-saga/core";
import fbAuthSaga from "../reducers/fbAuthSaga";

// 로컬 저장
//combineReducers 는 여러 개의 reducer 를
// 하나의 root reducer 로 합쳐준다.
// 기존에는 configureStore 로 처리를 했다.
// 그러나, persistReducer 도 rudecer 를 전달합니다.
import { combineReducers } from "redux";
// localstorage
// import storage from "redux-persist/lib/storage";

//session
import storageSession from "redux-persist/lib/storage/session";

import persistReducer from "redux-persist/es/persistReducer";

const reducers = combineReducers({
  fbAuth: fbAuthSlice.reducer,
});
const persistConfig = {
  key: "info",
  // localstorage
  // storage: storage,

  //session
  storage: storageSession,
  whitelist: ["fbAuth"],
};
const rc = persistReducer(persistConfig, reducers);
// Saga 인스턴스
const saga = createSagaMiddleware();
// reducer 들을 모아줌
// 하나의 store에는 하나의 저장소(store) 만 저장할 수 있다
// 1 store 1 reducer
const store = configureStore({
  // reducer: {
  //   // 이름 키 : slice.리듀서
  //   fbAuth: fbAuthSlice.reducer,
  // },
  reducer: rc,
  middleware: [saga],
});
saga.run(fbAuthSaga);

export default store;
