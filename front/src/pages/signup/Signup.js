import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpAxios } from "../../utils/signAxios";
import StyledDiv from "../../components/layout/StyledDiv";

const Signup = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userType, setUserType] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signUpAxios("post", "signup", userId, userPw, userType).then(
        (res) => {
          if (res.data.result) {
            navigate("/signin", { replace: true });
            alert("회원가입에 성공하셨습니다. 로그인 후 이용해 주세요");
          }
        }
      );
    } catch (err) {
      console.error("login error", err);
      alert("회원가입에 실패하였습니다. 아이디 중복");
    }
  };

  const onValueChange = (e) => {
    setUserType(e.target.value);
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <StyledDiv>
        <h2>회원가입</h2>
        <input
          type="text"
          name="user_id"
          onChange={(e) => setUserId(e.target.value)}
          placeholder="id"
        />
        <input
          type="password"
          name="user_pw"
          onChange={(e) => setUserPw(e.target.value)}
          placeholder="pw"
        />
        <span>
          드라이버
          <input
            value="드라이버"
            type="radio"
            name="user"
            onClick={onValueChange}
          />
        </span>
        <span>
          일반인
          <input
            value="일반인"
            type="radio"
            name="user"
            onClick={onValueChange}
          />
        </span>
        <button type="submit" onClick={handleSubmit}>
          제출
        </button>
      </StyledDiv>
    </div>
  );
};

export default Signup;
