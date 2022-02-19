import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { signInAxios } from "../../utils/signAxios";
import StyledDiv from "../../components/layout/StyledDiv";
import { useCookies } from "react-cookie";

const Signin = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [cookies, setCookie] = useCookies([""]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !userPw) {
      return;
    }

    await signInAxios("post", "signin", userId, userPw).then((res) => {
      console.log(res);
      if (res.data.result) {
        localStorage.setItem("token", res.data.token);
        navigate("/call", { replace: true });
      } else {
        alert("아이디 비밀번호 확인해주세요");
        setUserId("");
        setUserPw("");
      }
    });
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <StyledDiv>
        <h2>로그인</h2>
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
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
        <button>
          <Link to="/signup">회원가입</Link>
        </button>
      </StyledDiv>
    </div>
  );
};

export default Signin;
