import { updatePassword } from "firebase/auth";
import { useState } from "react";
import { appAuth } from "../firebase/config";

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
