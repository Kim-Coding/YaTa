import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
      </div>
    </div>
  );
};

export default Signin;
