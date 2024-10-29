import React, { useEffect } from "react";

const User = ({ user, onRemove, onToggle }) => {
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
        onClick={() => onToggle(user.id)}
      >
        {user.username}

      </b>
      <span>
        ({user.email})
      </span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  )
}


function UserList({ users, onRemove, onToggle }) {

  return <div>
    {users.map((user, idx) => (
      <User user={user} key={idx} onRemove={onRemove} onToggle={onToggle} />
    ))}
  </div>
}

export default UserList;