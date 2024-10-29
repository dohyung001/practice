import React, { useState, useRef } from "react";


function InputSample() {
  const [input, setInput] = useState({
    name: "",
    nickname: ""
  });

  const { name, nickname } = input;
  const nameInput = useRef(); //useRef활용

  //기존의 input에 추가하는 초식
  const onChange = (e) => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value
    })
  };

  const onReset = () => {
    setInput({
      name: "",
      nickname: "",
    });

    nameInput.current.focus(); //컴포넌트에 focus
  };


  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput} /> {/*ref 지정*/}
      <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname} />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: {name}({nickname})</b>
      </div>
    </div >
  );
}
export default InputSample;