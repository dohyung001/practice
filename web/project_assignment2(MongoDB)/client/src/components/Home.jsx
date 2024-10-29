import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [name, setName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register');
  const handleLogout = () => {
    sessionStorage.removeItem('token'); // 세션에서 토큰 삭제
    setIsAuthenticated(false); // 인증 상태 업데이트
    navigate('/login');
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    // 토큰이 없으면 로그인 페이지로 리디렉션
    if (!token) {
      navigate('/login');
      return;
    } else {
      setIsAuthenticated(true); // 토큰이 있으면 인증 상태를 true로 설정
    }

    // 사용자 정보를 가져오는 비동기 함수
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users/home', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setName(response.data.name); // 사용자 이름 설정
      } catch (error) {
        alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
        sessionStorage.removeItem('token'); // 만료된 토큰 삭제
        setIsAuthenticated(false);
        navigate('/login');
      }
    };

    fetchData(); // 사용자 정보 요청 함수 호출
  }, [navigate]);

  return (
    <div>
      <h1>Home</h1>
      {isAuthenticated && (
        <>
          <div>환영합니다, {name}님</div>
          <div>제출자명: 김도형</div>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      <>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button>
      </>

    </div>
  );
}

export default Home;
