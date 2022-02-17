import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>YaTa</h1>
      <Link to="/signin">로그인</Link>
      <Link to="/signup">회원가입</Link>
    </div>
  );
};

export default Home;
