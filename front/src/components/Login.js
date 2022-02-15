import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ setIsLogin }) => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !userPw) {
      return;
    }
    const response = await axios({
      method: "post",
      url: "/login",
      data: {
        user_id: userId,
        user_pw: userPw,
      },
    });

    if (response.data.result === "ok") {
      setIsLogin(true);
    } else {
      alert("로그인에 실패했습니다.");
      setUserId("");
      setUserPw("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="user_id"
          value={userId || ""}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="id"
        />
        <input
          type="password"
          name="user_pw"
          value={userPw || ""}
          onChange={(e) => setUserPw(e.target.value)}
          placeholder="pw"
        />
        <button type="submit">Login</button>
      </form>
      <button>
        <Link to="/signup">회원가입</Link>
      </button>
    </div>
  );
};

export default Login;
