import React, { useState, useRef } from "react";

const User = ({ user }) => {
  return (
    <div>
      <span>{user.id}</span>
      <span>{user.username}</span>
      <span>{user.email}</span>
    </div>
  )
}
function UserList() {
  const users = [
    {
      id: 1,
      username: "kdpark",
      email: "kdpark@kw.ac.kr",
    },
    {
      id: 2,
      username: "admin",
      email: "admin@kw.ac.kr",
    },
    {
      id: 3,
      username: "root",
      email: "sudo@kw.ac.kr",
    },
  ]
  return <div>
    {users.map((user, idx) => (
      <User user={user} key={idx} />
    ))}
  </div>
}

export default UserList;