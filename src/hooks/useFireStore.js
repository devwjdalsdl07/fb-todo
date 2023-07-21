import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useReducer } from "react";
import { appFireStore, timestamp } from "../firebase/config";

// FB 의 Store CRUD Hook

// 초기값
const initState = {
  document: null, //전송할 document
  isPending: false, // 네트워크 연결
  error: null, // 에러 메시지
  succes: false, // 작업완료
};

// State 업데이트 리듀서
const storeReducer = (state, action) => {
  switch (action.type) {
    case "isPending":
      return { isPending: true, document: null, error: null, succes: false };
    case "addDoc":
      return {
        isPending: false,
        document: action.payload,
        error: null,
        succes: true,
      };
    case "deleteDoc":
      return {
        isPending: false,
        document: action.payload,
        error: null,
        succes: true,
      };
    case "updateCompleted":
      return {
        isPending: false,
        document: action.payload,
        error: null,
        succes: true,
      };
    default:
      return state;
  }
};
export const useFireStore = transaction => {
  // dispatch 를 통해서 reducer 실행
  const [response, dispatch] = useReducer(storeReducer, initState);
  // FB store 의 컬렉션을 먼저 참조한다.
  // 컬렉션 (collection) 은 폴더라고 생각하시면 됩니다.
  // const colRef = collection(appFireStore, 컬렉션이름);
  const colRef = collection(appFireStore, transaction);

  // document 추가 : collection에 document 추가
  const addDocument = async doc => {
    // 네트워크 연결함을 표현
    dispatch({ type: "isPending" });
    try {
      // doc 는 {title: "내용", completed: false}
      const createTime = timestamp.fromDate(new Date());
      // doc 는 {title: "내용", completed: false, createTime: 시간}
      const docRef = await addDoc(colRef, { ...doc, createTime });
      dispatch({ type: "addDoc", payload: docRef });
    } catch (err) {
      console.log(err);
    }
  };
  // document 삭제
  const deleteDocument = async id => {
    dispatch({ type: "isPending" });
    try {
      const docRef = await deleteDoc(doc(colRef, id));
      console.log("삭제했어용");
      dispatch({ type: "deleteDoc", payload: docRef });
    } catch (err) {
      console.log(err);
    }
  };

  // completed 업데이트
  const updateCompletedDocument = async (id, flag) => {
    dispatch({ type: "isPending" });
    try {
      const docRef = await updateDoc(doc(colRef, id), { completed: flag });
      dispatch({ type: "updateCompleted", payload: docRef });
    } catch (err) {
      console.log(err);
    }
  };
  // 외부 호출
  return { addDocument, deleteDocument, updateCompletedDocument, response };
};
