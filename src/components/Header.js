import React from "react";
import { Link } from "react-router-dom";
// import firebase from "../firebase";
// import { useLogout } from "../hooks/useFirebase";
import { useDispatch, useSelector } from "react-redux";
import { asyncLogoutFetch } from "../reducers/actions";
import { sagaLogoutFB } from "../reducers/fbAuthSlice";

const Header = () => {
  // AuthContext 로그아웃 실행으로 상태 변경
  // const { logout } = useLogout();
  const { displayName, email, uid } = useSelector(state => state.fbAuth);
  // console.log("============");
  // console.log(user);

  // const navigator = useNavigate();
  // fb 로그아웃
  const dispatch = useDispatch();
  const handleLogout = async () => {
    // logout();
    // try {
    //   await dispatch(asyncLogoutFetch()).unwrap();
    //   // 후속 처리
    // } catch (err) {
    //   console.log(err);
    // }
    dispatch(sagaLogoutFB());

    // firebase.auth().signOut();
    // console.log("로그아웃");
    // setFBName("");
    // setFBEmail("");
    // setFBUid("");
    // navigator("/");
  };
  return (
    <header className="p-7 bg-black">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-white hover:text-orange-600">
          로고
        </Link>
        <ul className="flex items-center justify-center gap-4">
          <li>
            <Link to="/home" className="text-white hover:text-orange-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-orange-600">
              About
            </Link>
          </li>
          <li>
            <Link
              to={uid ? "/todo" : "/login"}
              className="text-white hover:text-orange-600"
            >
              Todo
            </Link>
          </li>
          <li>
            <Link to="/schedule" className="text-white hover:text-green-400">
              Schedule
            </Link>
          </li>
          <li>
            <Link to="/upload" className="text-white hover:text-green-400">
              Upload
            </Link>
          </li>
          <li>
            <Link to="/chart" className="text-white hover:text-green-400">
              Chart
            </Link>
          </li>
        </ul>
        <div className="flex justify-center gap-5">
          {uid ? (
            <div className="text-white">
              {displayName} {email} {uid}
              <button onClick={handleLogout}>로그아웃</button>
              <Link to="/mypage">마이페이지</Link>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-orange-600">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:text-orange-600">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
