import { createContext, useEffect, useReducer } from "react";
import { appAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

// FB 인증 Context 생성
// Context 생성 목적은 전역 상태정보 활용
// 중간중간 컴포넌트에 props 를 전달하지 않고
//  상태정보 출력 및 수정 이  목적
const AuthContext = createContext();
// context 관리 Reducer함수
// action (요청서) 을 처리하는 reducer 함수
// reducer 함수 형태로 action(요청서) 를 처리하는 이유는
// 원본(State)를 훼손하지 않고 원하는 데이터 처리 후
// 원본(state)를 변경한다. (불변성 유지)
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
      console.log(action.payload);
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
// Context 를 구독(Subscribe)하도록 Provider 를 생성
const AuthContextProvider = ({ children }) => {
  // user 정보를 관리할 함수(Reducer)를 생성
  // 각각의 컴포넌트 상태 관리를 위한 Hook
  // const [상태, 상태관리(수정)함수] = useState(초기값); (컴포넌트용)

  // Context 에 담겨진 전역 상태 관리를 위한 Hook
  // const [전역상태, 전역상태관리함수] = useReducer(함수, 초기값);
  const [state, dispatch] = useReducer(authReducer, {
    user: null, // fb 로그인 정보 {email:"", uid:"",nickName:""}
    isAuthReady: false, // 로그인 상태 체크
    errMessage: "", // 에러 메시지
    kakaoProfile: null, //kakao 저장 정보
  });
  // FB 인증 웹브라우저 새로 고침 처리
  useEffect(() => {
    onAuthStateChanged(appAuth, user => {
      // console.log("onAuthStateChanged : ", user);
      dispatch({ type: "isAuthReady", payload: user });
    });
  }, []);

  return (
    // Context 내부의 컴포넌트들에게 State (상태정보) 를 공급하겠다
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthContextProvider };
