
import React, { useRef, useState, useMemo, useReducer } from 'react';
import Counter from "./Counter.jsx"// <Counter />
import InputSample from './InputSample.jsx';// <InputSample />
import CreateUser from './CreateUser.jsx';
import UserList from './UserList.jsx'

function countActiveUsers(users) {
  console.log('활성사용자수를세는중...');
  return users.filter((user) => user.active).length;
}
const initialState = {
  inputs: {
    username: "",
    email: "",
  },
  users: [
    {
      id: 1,
      username: "kdpark",
      email: "kdpark@kw.ac.kr",
      active: true,
    },
    {
      id: 2,
      username: "admin",
      email: "admin@kw.ac.kr",
      active: false,
    },
    {
      id: 3,
      username: "root",
      email: "sudo@kw.ac.kr",
      active: false,
    },
  ]
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        inputs: state.inputs,
        users: [...state.users, action.user]
      };
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id
            ? { ...user, active: !user.active }
            : user
        ),
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}
export const UserDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const { username, email } = state.inputs;


  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  };

  const onRemove = id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  };

  const onToggle = id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  };

  const nextId = useRef(4);

  const onCreate = () => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
  };


  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성사용자수: {count}</div>
    </UserDispatch.Provider>
  )
}

export default App;