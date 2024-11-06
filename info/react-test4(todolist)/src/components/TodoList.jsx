import React, { useContext } from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { TodoStateContext } from "./TodoContext";
const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
    const todos = useContext(TodoStateContext);
  return (
    <TodoListBlock>
        {todos.map((todo)=>(
            <TodoItem 
            key={todo.id}
            id={todo.id}
            done={todo.done}
            text={todo.text}
            />
        ))}
    </TodoListBlock>
  );
}
export default TodoList;
