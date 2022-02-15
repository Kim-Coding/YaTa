import { useState } from "react";
import Call from "../../components/Call";
import Login from "../../components/Login";

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <div>YaTa</div>
      {!isLogin ? <Login setIsLogin={setIsLogin} /> : <Call />}
    </div>
  );
};

export default Home;
