import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import StyledDiv from "../../style/StyledDiv";

const Signup = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userType, setUserType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "/api/auth/signup",
        data: {
          id: userId,
          pw: userPw,
          userType: userType,
        },
      });

      if (response.data.result === "ok") {
        console.log("회원가입 성공 페이지 이동");
      }
    } catch (err) {
      console.error("login error", err);
      alert("회원가입에 실패하였습니다. 잠시 후 다시 시도해주세요.");
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
