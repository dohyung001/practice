import React, { useEffect, useContext } from "react";
import { UserDispatch } from './App';

function CreateUser({ username, email, onChange, onCreate }) {
  const dispatch = useContext(UserDispatch);


  return (
    <div>
      <input
        name='username'
        placeholder='계정명'
        onChange={(e) => { dispatch({ type: 'CHANGE_INPUT', name: e.target.name, value: e.target.value }); }}
        value={username}
      />
      <input
        name='email'
        placeholder='이메일'
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}
export default CreateUser;