import { useState } from "react";
import Call from "../../components/Call";
import Login from "../../components/Login";

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>YaTa</h1>
      {!isLogin ? <Login setIsLogin={setIsLogin} /> : <Call />}
    </div>
  );
};

export default Home;
