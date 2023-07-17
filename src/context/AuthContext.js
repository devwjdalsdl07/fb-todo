import { createContext, useReducer } from "react";

// FB 인증 Context 생성
// Context 생성 목적은 전역 상태정보 활용
// 중간중간 컴포넌트에 props 를 전달하지 않고
//  상태정보 출력 및 수정 이  목적
const AuthContext = createContext();
// context 관리 Reducer함수
const authReducer = (state, action) => {
  // console.log(action.type, action.payload);
  console.log("리듀서함수 : ", action);
  switch (action.type) {
    case "login":
      // state 를 갱신한다.
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };

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
  });

  return (
    // Context 내부의 컴포넌트들에게 State (상태정보) 를 공급하겠다
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthContextProvider };
