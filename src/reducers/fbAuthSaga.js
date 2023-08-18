import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { call, put, takeEvery } from "redux-saga/effects";
import { appAuth } from "../firebase/config";
// import { Result } from "antd";
import {
  sagaLoginFailFB,
  sagaLoginSuccessFB,
  sagaLogoutSuccessFB,
} from "./fbAuthSlice";
// 함수 * 제너레이터는 실행중 멈춤, 재생이 가능하다.
function* fbAuthSaga() {
  console.log("saga : 1. fbAuthSaga 실행");
  yield takeEvery("fbAuthSlice/sagaLoginFB", fbLogin);
  yield takeEvery("fbAuthSlice/sagaLogoutFB", fbLogout);
}

function* fbLogin(action) {
  console.log("saga : 2. fbLogin");
  console.log(action);
  // 외부 api 연동을 시도한다.
  // yield call( 외부연동함수작성 );
  const userCredential = yield call(() => {
    const result = signInWithEmailAndPassword(
      appAuth,
      action.payload.email,
      action.payload.password,
    );
    return result;
  });
  const user = yield userCredential.user;
  // dispatch 를 통해서 state 를 업데이트 합니다.
  yield put(
    sagaLoginSuccessFB({
      email: user.email,
      displayName: user.displayName,
      uid: user.uid,
    }),
  );
  // // state를 업데이트 하려면 return 으로 돌려줌
  // return {
  //   email: user.email,
  //   displayName: user.displayName,
  //   uid: user.uid,
  // };
}

function* fbLogout(action) {
  console.log("saga : 2. fbLogout");
  console.log(action);
  yield call(() => {
    signOut(appAuth);
  });
  yield put(sagaLogoutSuccessFB());
}
export default fbAuthSaga;
