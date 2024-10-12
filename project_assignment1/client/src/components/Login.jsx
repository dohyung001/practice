import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/users/login', { id, pw: password });
      const data = response.data;

      if (data.success) {
        navigate(`/home?name=${data.name}`);  // 성공 시 홈 페이지로 이동
      } else {
        alert('ID나 PW가 잘못되었습니다.');
      }
    } catch (error) {
      alert('로그인 실패.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>ID:</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <button type="submit">Login</button>
      </form>
      <a href="/register">회원가입</a>
    </div>
  );
}

export default Login;