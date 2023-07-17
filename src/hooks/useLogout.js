import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { appAuth } from "../firebase/config";
import { signOut } from "firebase/auth";

// FB 로그아웃
export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const logout = async () => {
    setError(null);
    setIsPending(true);
    try {
      dispatch({ type: "logout" });
    } catch (err) {
      console.log(err);
    }
    // FB 로그아웃 API
    signOut(appAuth)
      .then(() => {})
      .catch(err => {
        // An error happened.
        console.log(err);
      });
  };
  return { error, isPending, logout };
};
