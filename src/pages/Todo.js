import React, { useEffect } from "react";
import { useState } from "react";
import List from "../components/List";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../hooks/useFirebase";
import { deleteAllTodo } from "../axios/axios";
// collection import
import { useCollection } from "../hooks/useCollection";
import { useSelector } from "react-redux";

const Todo = () => {
  // 사용자별 등록을 위해 user 를 참조
  const { uid, email, displayName } = useSelector(state => state.fbAuth);
  // collection data 출력 state
  const { documents, error } = useCollection("todo", ["uid", "==", uid]);
  // console.log("문서목록 ========");
  // console.log(documents);

  const navigator = useNavigate();

  // 백엔드반에 DB table 구성에 활용한다.
  // FB, MongoDB 에서는 Collection 구성에 활용한다.
  // console.log(fbName, fbEmail);
  // 로컬 데이터 state 변수
  // const initTodoData = localStorage.getItem("fbTodoData")
  //   ? JSON.parse(localStorage.getItem("fbTodoData"))
  //   : [];
  const [todoData, setTodoData] = useState([]);

  const handleRemoveClick = () => {
    setTodoData([]);

    // // 로컬스토리지 초기화
    // localStorage.setItem("fbTodoData", JSON.stringify([]));
    deleteAllTodo();
  };

  return (
    <div className="flex justify-center items-start mt-5 w-full">
      {/* {isLoading && <Loading/>} */}
      <div className="w-4/5 p-6 bg-white rounded-[6px] shadow">
        <div className="flex justify-between mb-3">
          <h1 className="text-center w-3/4 text-2xl text-red-600 font-semibold">
            Firebase Todo-List
          </h1>
          <button
            className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400 text-[12px]"
            onClick={handleRemoveClick}
          >
            Delete All
          </button>
        </div>
        {/* 할일 목록 */}
        {error && <strong>{error}</strong>}
        {documents && <List todoData={documents} />}
        {/* <List todoData={todoData} setTodoData={setTodoData} /> */}
        {/* 할일 추가 */}
        <Form todoData={todoData} setTodoData={setTodoData} uid={uid} />
      </div>
    </div>
  );
};

export default Todo;
