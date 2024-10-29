import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const isAuthenticated = !!sessionStorage.getItem('token'); // sessionStorage 사용

  // 토큰이 있다면 홈으로
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
      return;
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/users/login', { id, pw: password });
      const data = response.data;

      if (data.success) {
        // 토큰을 sessionStorage에 저장
        sessionStorage.setItem('token', data.token);
        navigate(`/home`);
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
