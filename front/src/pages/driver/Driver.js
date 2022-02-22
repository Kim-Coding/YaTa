import { removeToken } from "../../utils/token";
import { useNavigate } from "react-router-dom";

const Driver = () => {
  const navigate = useNavigate();
  const Logout = () => {
    removeToken();
    navigate("/");
  };
  return (
    <>
      <div>Call</div>
      <button onClick={Logout}>로그아웃</button>
    </>
  );
};

export default Driver;
