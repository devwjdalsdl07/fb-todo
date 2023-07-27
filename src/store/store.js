import { configureStore } from "@reduxjs/toolkit";
import fbAuthSlice from "../reducers/fbAuthSlice";

// reducer 들을 모아줌
// 하나의 store에는 하나의 저장소(store) 만 저장할 수 있다
// 1 store 1 reducer
const store = configureStore({
  reducer: {
    // 이름 키 : slice.리듀서
    fbAuth: fbAuthSlice.reducer,
  },
});
export default store;
