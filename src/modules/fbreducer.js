// fb 액션타입 정의
export const FB_LOGIN = "fb/login";
export const FB_LOGOUT = "fb/logout";
export const FB_IS_AUTHREADY = "fb/isAuthReady";
export const FB_UPDATE_NAME = "fb/updateName";
export const FB_UPDATE_EMAIL = "fb/updateEmail";
export const FB_USER_DELETE = "fb/userDelete";
export const FB_IS_ERROR = "fb/isError";
// fb 스토어 state 초기값
// 1. Redux Store 에서 관리할 초기 객체
export const initialState = {
  user: null, // fb 로그인 정보 {email:"", uid:"",nickName:""}
  isAuthReady: false, // 로그인 상태 체크
  errMessage: "", // 에러 메시지
  // kakaoProfile: null, //kakao 저장 정보
};
// fb 리듀서 정의
const authReducer = (state, action) => {
  // console.log(action.type, action.payload);
  // console.log("리듀서함수 : ", action);
  // action 은 반드시 형태가 {type: "구분자"}
  switch (action.type) {
    case FB_LOGIN:
      // state 를 갱신한다.
      return { ...state, user: action.payload };
    case FB_LOGOUT:
      return { ...state, user: null };

    case FB_IS_AUTHREADY:
      return { ...state, user: action.payload, isAuthReady: true };

    case FB_UPDATE_NAME:
      return { ...state, user: action.payload };

    case FB_UPDATE_EMAIL:
      return { ...state, user: action.payload };

    case FB_USER_DELETE:
      return { ...state, user: null };

    case FB_IS_ERROR:
      return { ...state, errMessage: action.payload };

    default:
      // 그대로 돌려준다.
      return state;
  }
};
export default authReducer;
