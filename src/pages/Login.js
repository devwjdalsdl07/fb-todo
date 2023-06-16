import { useState } from "react";
import { LoginDiv } from "../style/UserCss";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase.js";
const Login = ({ setFBName, setFBEmail, setFBUid }) => {
  // Link, NavLink, useNavigate = 페이지 이동
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 기능
  const handleLogin = async e => {
    e.preventDefault();
    // FireBase 로그인 시도
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("로그인 성공");
      const user = firebase.auth().currentUser;
      console.log(user);
      setFBName(user.displayName);
      setFBEmail(user.email);
      setFBUid(user.uid);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/invalid-email") {
        alert("올바른 이메일 형식이 아닙니다.");
      } else if (error.code === "auth/wrong-password") {
        alert("올바르지 않은 비밀번호 입니다.");
      } else if (error.code === "auth/user-not-found") {
        alert("가입되지 않은 사용자 입니다.");
      } else if (error.code === "auth/missing-email") {
        alert("이메일이 입력되지 않았습니다.");
      } else {
        alert("로그인에 실패했습니다.");
      }
    }
  };
  return (
    <div className="p-6 m-auto mt-5 shadow rounded-md bg-white">
      <h2>Login</h2>
      {/* 
  1. emotion 을 활용하여 tag 의 용도를 구분한다. 
  2. css 도 함께 적용한다
  */}
      <LoginDiv>
        <form>
          <label htmlFor="">email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="">password</label>
          <input
            type="password"
            minLength={8}
            maxLength={16}
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className="flex justify-center gap-5 w-full">
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => handleLogin(e)}
            >
              Login
            </button>
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              SignUp
            </button>
            <button
              className="text-blue-500"
              onClick={e => {
                e.preventDefault();
                console.log("password 찾기");
                // navigate("/password")
              }}
            >
              Forgot Password
            </button>
          </div>
        </form>
      </LoginDiv>
    </div>
  );
};
export default Login;
