import React from "react";
import ListItem from "./ListItem";

const List = ({ todoData, setTodoData }) => {
  return (
    <div>
      {todoData.map(item => (
        // key 는 반복문에서 unique 해야 한다.
        <ListItem
          key={item.id}
          item={item}
          todoData={todoData}
          setTodoData={setTodoData}
        />
      ))}
    </div>
  );
};

export default List;
