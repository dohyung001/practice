import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // axios 임포트

function Register() {
  const [id, setId] = useState('');
  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');
  const [isIdAvailable, setIsIdAvailable] = useState(null); // null: 체크 전, true: 사용 가능, false: 중복
  const [isPasswordMatch, setIsPasswordMatch] = useState(false); // 비밀번호 일치 여부
  const [formValid, setFormValid] = useState(false); // 모든 조건 충족 시 submit 가능
  const navigate = useNavigate();

  // 비밀번호 일치 여부 확인 (onblur 이벤트와 연동)
  useEffect(() => {
    setIsPasswordMatch(pw1 === pw2 && pw1 !== '');
  }, [pw1, pw2]);

  // 모든 조건을 충족했을 때 submit 버튼 활성화
  useEffect(() => {
    setFormValid(isIdAvailable && isPasswordMatch);
  }, [isIdAvailable, isPasswordMatch]);

  // ID 중복 체크 함수 (버튼 클릭 시 호출)
  const checkIdAvailability = async () => {
    if (id === '') {
      alert('ID를 입력해주세요.');
      return;
    }

    try {
      const response = await axios.get(`/api/users/check-id`, { params: { id } });
      const data = response.data;
      setIsIdAvailable(!data.exists); // 존재하지 않으면 사용 가능
      if (!data.exists) {
        alert('ID 사용 가능합니다.');
      } else {
        alert('ID가 이미 존재합니다.');
      }
    } catch (error) {
      alert('ID 체크에 실패했습니다.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) return; // 유효하지 않으면 제출하지 않음

    try {
      const response = await axios.post('/api/users/register', { id, pw1, pw2 });
      const data = response.data;
      if (data.success) {
        navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
      } else {
        alert(`회원가입 실패: ${data.message}`);
      }
    } catch (error) {
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>ID:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <button type="button" onClick={checkIdAvailability}>
          중복 ID 체크
        </button>
        {isIdAvailable === true && <span style={{ color: 'green' }}>ID 사용 가능</span>}
        {isIdAvailable === false && <span style={{ color: 'red' }}>ID가 이미 존재합니다</span>}
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={pw1}
          onChange={(e) => setPw1(e.target.value)}
          onBlur={() => setIsPasswordMatch(pw1 === pw2 && pw1 !== '')}
          required
        />
        <br />
        <label>Confirm Password:</label>
        <input
          type="password"
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
          onBlur={() => setIsPasswordMatch(pw1 === pw2 && pw1 !== '')}
          required
        />
        <br />
        <button type="submit" disabled={!formValid}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;