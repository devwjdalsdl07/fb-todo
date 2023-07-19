import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { appAuth } from "../firebase/config";
import { deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const useUserDelete = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
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
    }
  };
  return { error, isPending, userDelete };
};
