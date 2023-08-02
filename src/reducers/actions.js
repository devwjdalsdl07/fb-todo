import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { appAuth } from "../firebase/config";
import fbAuthSlice from "./fbAuthSlice";
// 로그인 thunk 액션
export const asyncLoginFetch = createAsyncThunk(
  "fbAuthSlice/asyncLoginFetch",
  async ({ email, password }) => {
    console.log(email, password);
    try {
      const userCredential = await signInWithEmailAndPassword(
        appAuth,
        email,
        password,
      );
      const user = userCredential.user;

      // state를 업데이트 하려면 return 으로 돌려줌
      return {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
      };

      // dispatch(
      //   loginFB({
      //     email: user.email,
      //     displayName: user.displayName,
      //     uid: user.uid,
      //   }),
      // );
    } catch (err) {
      // console.log(err.message);
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
      // dispatch(isErrorFB(errMessage));
      return { errMessage };
    }
  },
);
// 로그아웃 thunk 액션
export const asyncLogoutFetch = createAsyncThunk(
  "fbAuthSlice/asyncLogoutFetch",
  async () => {
    // FB 로그아웃 API
    try {
      await signOut(appAuth);
      return { uid: null, email: null, displayName: null, errMessage: "" };
    } catch (err) {
      return { errMessage: "로그아웃을 다시 시도하세요" };
    }
  },
);
