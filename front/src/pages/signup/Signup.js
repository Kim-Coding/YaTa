import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userType, setUserType] = useState("");
  const [isJoinSuccess, setJoinSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "/register",
        data: {
          id: userId,
          pw: userPw,
          userType: userType,
        },
      });

      if (response.data.result === "ok") {
        setJoinSuccess(true);
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        {!isJoinSuccess && (
          <>
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
          </>
        )}
        {isJoinSuccess && (
          <div>
            <p>회원가입을 축하합니다!</p>
            <Link to="/">로그인</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
