import React, { useContext } from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { TodoStateContext, TodoDispatchContext } from "./TodoContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  const todos = useContext(TodoStateContext);
  const dispatch = useContext(TodoDispatchContext);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(todos);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    // 전역 상태 동기화
    dispatch({ type: "REORDER", newOrder: newItems });
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}> {/* 콘텍스트*/}
      <Droppable droppableId="todolist"> {/* 드로퍼블(컨테이너) */}
        {(provided) => (
          <TodoListBlock {...provided.droppableProps} ref={provided.innerRef}> {/*실제 드로퍼블(컨테이너)*/}
            {todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}> {/* 드래거블(아이템) */}
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}  /* 실제 드래거블(아이템) */
                    {...provided.dragHandleProps}  /*핸들 할 아이템*/
                  >
                    <TodoItem
                      id={todo.id}
                      done={todo.done}
                      text={todo.text}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </TodoListBlock>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TodoList;
