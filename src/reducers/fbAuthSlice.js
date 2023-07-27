import { createSlice } from "@reduxjs/toolkit";

// slice 초기값
const initialState = {
  uid: null,
  displayName: null,
  email: null,
  isAuthReady: false, // 로그인 상태 체크
  errMessage: "", // 에러 메시지
  // kakaoProfile: null, //kakao 저장 정보
};
// slice 생성
const fbAuthSlice = createSlice({
  name: "fbAuthSlice",
  initialState,
  // 액션 크리에이터 함수 모음 (액션 생성 함수)
  // 상태를 즉시 업데이트 (동기코드)
  reducers: {
    loginFB: (state, action) => {
      // state.user = action.payload;
      state.displayName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
    },
    logoUtFB: state => {
      // state.user = null;
    },
    isAuthReadyFB: (state, action) => {
      // state.user = action.payload;
      state.displayName = action.payload && action.displayName;
      state.uid = action.payload && action.payload.uid;
      state.email = action.payload && action.payload.email;

      state.isAuthReady = true;
    },
    updateNameFB: (state, action) => {
      // state.user = action.payload;
      state.displayName = action.payload.displayName;
    },
    updateEmailFB: (state, action) => {
      // state.user = action.payload;
      state.email = action.payload.email;
    },
    deleteUserFB: state => {
      // state.user = null;
      state.displayName = null;
      state.uid = null;
      state.email = null;
    },
    isErrorFB: (state, action) => {
      state.errMessage = action.payload;
    },
  },
});
// store 에 포함하기 위한 export
export default fbAuthSlice;
// dsipatch 활용
export const {
  loginFB,
  logoUtFB,
  isAuthReadyFB,
  updateNameFB,
  updateEmailFB,
  deleteUserFB,
  isErrorFB,
} = fbAuthSlice.actions;
