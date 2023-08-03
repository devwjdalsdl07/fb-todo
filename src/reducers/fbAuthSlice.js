import { createSlice } from "@reduxjs/toolkit";
import { asyncLoginFetch, asyncLogoutFetch } from "./actions";

// 추후에 actions.js 파일로 작성하시길 권장
// thunk 액션 크리에이터는 많아질 소지가 있습니다.
// dispatch( asyncLoginFetch() )
// 로그인 액션
// const dispatch = useDispatch();

// slice 초기값
const initialState = {
  uid: null,
  displayName: null,
  email: null,
  isAuthReady: false, // 로그인 상태 체크
  errMessage: "", // 에러 메시지
  // kakaoProfile: null, //kakao 저장 정보
  isLoading: false, // 비동기 처리
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
  // 비동기 업데이트 체크(미들웨어) 코드
  // axios 또는 fetch 를 이용합니다.
  // 비동기 액션(thunk 리듀서) 에 따른 액션처리
  // pending(호출중) / fulfield(결과리턴) / rejected(호출실패)
  extraReducers: builder => {
    builder.addCase(asyncLoginFetch.pending, (state, action) => {
      console.log("로그인 연결중....");
      state.isLoading = true;
    });
    builder.addCase(asyncLoginFetch.fulfilled, (state, action) => {
      console.log("결과를 돌려받음");
      console.log(action);

      state.displayName = action.payload.displayName
        ? action.payload.displayName
        : null;
      state.uid = action.payload.uid ? action.payload.uid : null;
      console.log(state.uid);
      state.email = action.payload.email ? action.payload.email : null;
      state.errMessage = action.payload.errMessage
        ? action.payload.errMessage
        : null;

      state.isLoading = false;
    });
    builder.addCase(asyncLoginFetch.rejected, (state, action) => {
      console.log("네트워크 에러");
      state.isLoading = false;
      state.errMessage = action.payload.errMessage;
    });
    // logout 케이스
    builder.addCase(asyncLogoutFetch.fulfilled, (state, action) => {
      console.log("로그아웃 완료");
      state.displayName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.errMessage = action.payload.errMessage;
    });
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
// 비동기 액션 크리에이터 (dispatch 로 호출)
// export { asyncLoginFetch };
