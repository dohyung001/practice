import { useRef, useState, useMemo } from 'react';
import Counter from "./Counter"// <Counter />
import InputSample from './InputSample.jsx';// <InputSample />
import CreateUser from './CreateUser.jsx';
import UserList from './UserList.jsx'

function countActiveUsers(users) {
  console.log('활성사용자수를세는중...');
  return users.filter((user) => user.active).length;
}




function App() {

  const [input, setInput] = useState({
    username: '',
    email: '',
  })


  const { username, email } = input;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "kdpark",
      email: "kdpark@kw.ac.kr",
      active: false,
    },
    {
      id: 2,
      username: "admin",
      email: "admin@kw.ac.kr",
      active: true,
    },
    {
      id: 3,
      username: "root",
      email: "sudo@kw.ac.kr",
      active: true,
    },
  ]);

  const nextId = useRef(4);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers([...users, user]);
    setInput({
      username: '',
      email: '',
    });
    nextId.current += 1;
  }

  const onRemove = (id) => {
    setUsers(users.filter((e) => e.id !== id));
  };

  const onToggle = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate} />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자수: {count}</div>
    </>
  )
}

export default App;