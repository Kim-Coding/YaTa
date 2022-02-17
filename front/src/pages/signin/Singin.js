import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import StyledDiv from "../../style/StyledDiv";

const Signin = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !userPw) {
      return;
    }
    const response = await axios({
      method: "post",
      url: "/api/auth/signin",
      data: {
        id: userId,
        pw: userPw,
      },
    });

    if (response.data.result === "ok") {
      console.log("로그인 성공");
    } else {
      alert("로그인에 실패했습니다.");
      setUserId("");
      setUserPw("");
    }
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <StyledDiv>
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
