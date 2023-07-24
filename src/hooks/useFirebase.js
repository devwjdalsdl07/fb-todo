import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  updateEmail,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import { appAuth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import KakaoLogin from "./../components/KakaoLogin";

// AuthContext Hook
// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   return context;
// };
// 사용자 로그인 Hook
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  // const { dispatch } = useAuthContext();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const login = async (email, password) => {
    setError(null);
    setIsPending(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        appAuth,
        email,
        password,
      );
      const user = userCredential.user;
      dispatch({ type: "login", payload: user });
      Navigate("/");
    } catch (err) {
      console.log(err.message);
      let errMessage = "";
      if (err.code === "auth/invalid-email") {
        errMessage = "올바른 이메일 형식이 아닙니다.";
      } else if (err.code === "auth/wrong-password") {
        errMessage = "올바르지 않은 비밀번호입니다.";
      } else if (err.code === "auth/user-not-found") {
        errMessage = "가입되지 않은 사용자 입니다.";
      } else if (err.code === "auth/missing-email") {
        errMessage = "이메일이 입력되지 않았습니다.";
      } else {
        errMessage = "로그인이 실패하였습니다.";
      }
      dispatch({ type: "isError", payload: errMessage });
    }
  };
  return { error, isPending, login };
};
// 사용자 로그아웃 Hook
export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  // const { dispatch } = useAuthContext();
  const dispatch = useDispatch();
  const Navigate = useNavigate;
  const logout = async () => {
    setError(null);
    setIsPending(true);
    try {
      await signOut(appAuth);
      dispatch({ type: "logout" });
      Navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return { error, isPending, logout };
};
// 사용자 회원가입 Hook
// 로그인, 로그아웃, 회원가입 처리 상태를 위한 Custom Hook
export const useSignup = () => {
  // authContext 데이터 전달
  // const { dispatch } = useAuthContext();
  const dispatch = useDispatch();

  // 사용자 상태에 따라 웹브라우저 라우터 이동
  const navigate = useNavigate();

  // 서버의 에러 상태를 보관
  const [error, setError] = useState(null);

  // 서버의 연결 시도 및 연결, 연결 후 상태를 보관
  const [isPending, setIsPending] = useState(false);

  // 실제 연결을 실행할 함수
  // signUp(이메일, 비밀번호, 닉네임)
  const signUp = async (email, password, displayName) => {
    // 실행시 초기에 에러는 없다.
    setError(null);

    // 통신을 연결한다.
    setIsPending(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        appAuth,
        email,
        password,
      );
      const user = userCredential.user;
      if (!user) {
        // 에러 객체를 던진다.
        // console.log("회원 가입에 실패하였습니다.");
        return;
      }
      // 성공시에는 사용자 닉네임을 설정한다.
      await updateProfile(appAuth.currentUser, {
        displayName: displayName,
        //   photoURL: "https://example.com/jane-q-user/profile.jpg",
      });
      // console.log("dispatch 실행 ========= ");
      dispatch({ type: "login", payload: "user" });
      // 에러 없음
      setError(null);
      // 연결 후 작업 완료
      setIsPending(false);
      // 회원가입 성공으로 login 라우터로 이동
      navigate("/login");
    } catch (err) {
      console.log(err);
      let errMessage = "";
      if (err.code == "auth/email-already-in-use") {
        errMessage = "The email address is already in use";
      } else if (err.code == "auth/invalid-email") {
        errMessage = "The email address is not valid.";
      } else if (err.code == "auth/operation-not-allowed") {
        errMessage = "Operation not allowed.";
      } else if (err.code == "auth/weak-password") {
        errMessage = "The password is too weak.";
      }
      dispatch({ type: "isError", payload: errMessage });
    }
  };
  // 현재 error, isPending, signUp 을 리턴한다.
  return { error, isPending, signUp };
};
// 사용자 email 변경 Hook
export const useUpdateEmail = () => {
  // const { dispatch } = useAuthContext();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isPending, setIspending] = useState(false);

  const updateUserEmail = async email => {
    setError(null);
    setIspending(true);
    try {
      await updateEmail(appAuth.currentUser, email);

      setIspending(false);
      dispatch({ type: "updateEmail", payload: appAuth.currentUser });
    } catch (err) {
      console.log(err.message);
      setIspending(false);
      setError(err.message);
    }
  };
  return { error, isPending, updateUserEmail };
};
// 사용자 nickName 변경 Hook
export const useUpdateNickName = () => {
  // const { dispatch } = useAuthContext();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const updateNickName = async displayName => {
    setError(null);
    setIsPending(true);
    try {
      // FB 의 닉네임 변경 API 사용
      await updateProfile(appAuth.currentUser, {
        displayName: displayName,
        // photoURL: "https://example.com/jane-q-user/profile.jpg",
      });
      setIsPending(false);
      // context 의 state 변경
      dispatch({ type: "updateName", payload: appAuth.currentUser });
    } catch (err) {
      console.log(err.message);
      setIsPending(false);
      setError(err.message);
    }
  };
  return { error, isPending, updateNickName };
};
// 사용자 password 변경 Hook
export const useUpdatePassWord = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const updateUserPassWord = async newPass => {
    setError(null);
    setIsPending(true);
    try {
      await updatePassword(appAuth.currentUser, newPass);
      console.log("비밀번호업데이트완료");
      setIsPending(false);
    } catch (err) {
      console.log(err.message);
      setIsPending(false);
      setError(err.message);
    }
  };
  return { error, isPending, updateUserPassWord };
};
// 사용자 회원탈퇴 Hook
export const useUserDelete = () => {
  const navigate = useNavigate();
  // const { dispatch } = useAuthContext();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const userDelete = async () => {
    setError(null);
    setIsPending(false);
    try {
      await deleteUser(appAuth.currentUser);

      dispatch({ type: "userDelete" });
      navigate("/");
      setIsPending(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
      let errMessage = "";
      if (err.code == "auth/email-already-in-use") {
        errMessage = "The email address is already in use";
      } else if (err.code == "auth/invalid-email") {
        errMessage = "The email address is not valid.";
      } else if (err.code == "auth/operation-not-allowed") {
        errMessage = "Operation not allowed.";
      } else if (err.code == "auth/weak-password") {
        errMessage = "The password is too weak.";
      }
      dispatch({ type: "isError", payload: errMessage });
    }
  };
  return { error, isPending, userDelete };
};
