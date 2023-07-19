import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { appAuth } from "../firebase/config";
import { updateEmail } from "firebase/auth";

export const useUpdateEmail = () => {
  const { dispatch } = useAuthContext();
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
