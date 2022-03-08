import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StyledDiv from "../../components/layout/StyledDiv";
import StyledForm from "../../components/layout/StyleForm";
import request from "../../utils/serverAxios";

const initialInputs = {
  id: "",
  pw: "",
  userType: "일반인",
};

const Signup = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState(initialInputs);
  const { id, pw, userType } = inputs;

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onSummitSignUp = async (e) => {
    e.preventDefault();
    try {
      const result = await request.post({
        uri: "/api/user/signup",
        data: { id, pw, userType },
      });
      if (result.data.result) {
        alert("회원가입에 성공하셨습니다. 로그인 후 이용해 주세요");
        navigate("/");
      }
    } catch (err) {
      alert("다른 아이디 부탁드려요");
    }
  };

  return (
    <>
      <Link to="/">Home</Link>
      <StyledDiv>
        <h2>회원가입</h2>
        <StyledForm>
          <input placeholder="아이디" name="id" onChange={onChangeInput} />
          <input
            type="password"
            placeholder="비밀번호"
            name="pw"
            onChange={onChangeInput}
          />
          <select name="userType" onChange={onChangeInput}>
            <option value="user">일반인</option>
            <option value="driver">드라이버</option>
          </select>
          <input type="submit" onClick={onSummitSignUp} />
        </StyledForm>
      </StyledDiv>
    </>
  );
};

export default Signup;
