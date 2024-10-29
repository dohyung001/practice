import React, { useEffect, useContext } from "react";
import { UserDispatch } from './App';


const User = ({ user }) => {
  const dispatch = useContext(UserDispatch);

  useEffect(() => {
    console.log('user가 나타남');

    return () => {
      console.log('user가 변경됨');
    };
  }, [user]);


  return (
    <div>
      <b style={{
        cursor: 'pointer',
        color: user.active ? 'green' : 'black',
      }}
        onClick={() => {
          dispatch({ type: 'TOGGLE_USER', id: user.id });
        }}

      >
        {user.username}

      </b>
      <span>
        ({user.email})
      </span>
      <button onClick={() => {
        dispatch({ type: 'REMOVE_USER', id: user.id });
      }}>삭제</button>
    </div>
  )
}


function UserList({ users, }) {

  return <div>
    {users.map((user, idx) => (
      <User user={user} key={idx} />
    ))}
  </div>
}

export default UserList;