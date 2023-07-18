import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { appAuth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// FB 로그아웃
export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
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
