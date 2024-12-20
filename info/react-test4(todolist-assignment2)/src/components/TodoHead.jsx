import React, { useContext } from "react";
import styled from "styled-components";
import { TodoStateContext } from "./TodoContext";

function TodoHead() {


  const TodoHeadBlock = styled.div`
    padding-top: 48px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;
    border-bottom: 1pxsolid#e9ecef;
    h1 {
      margin: 0;
      font-size: 36px;
      color: #343a40;
    }
    .day {
      margin-top: 4px;
      color: #868e96;
      font-size: 21px;
    }
    .tasks-left {
      color: #20c997;
      font-size: 18px;
      margin-top: 40px;
      font-weight: bold;
    }
  `;

  const todos = useContext(TodoStateContext);
const undoneTasks = todos.filter((todo)=>!todo.done);
  return (
    <TodoHeadBlock>
      <h1>2026년7월10일</h1>
      <div className="day">수요일</div>
      <div className="tasks-left">할 일{undoneTasks.length}개 남음</div>
    </TodoHeadBlock>
  );
}
export default TodoHead;
