import React, { useReducer, createContext, useRef } from "react";
const initialTodos = [
  { id: 1, text: "헬스장가기", done: true },
  { id: 2, text: "정디프과제", done: true },
  { id: 3, text: "팀플미팅", done: false },
  { id: 4, text: "영화예매", done: false },
];
function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [...state, action.todo];
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    case "REORDER": //동기화
      return action.newOrder;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();
export const TodoNextIdContext = createContext();


export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}
