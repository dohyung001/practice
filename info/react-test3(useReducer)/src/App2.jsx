import React, { useState } from "react";

function InputSample() {
  const [input, setInput] = useState({
    name: "",
    nickname: "",
  });

  const { name, nickname } = input;

  // onChange 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  // DOM 요소에 직접 접근할 수 없기 때문에 포커스 설정 불가
  let nameInput = null;

  const onReset = () => {
    setInput({
      name: "",
      nickname: "",
    });

    // 포커스를 설정할 수 없음
    if (nameInput) {
      nameInput.focus(); // nameInput에 포커스를 설정하려 하지만, 포커스 설정이 제대로 되지 않을 수 있음
    }
  };

  return (
    <div>
      <input
        name="name"
        placeholder="이름"
        onChange={onChange}
        value={name}
        ref={(el) => (nameInput = el)} // ref 대신 변수에 DOM 요소 저장
      />
      <input
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>{name} ({nickname})</b>
      </div>
    </div>
  );
}

export default InputSample;