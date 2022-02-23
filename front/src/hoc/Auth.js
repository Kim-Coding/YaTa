import { useEffect } from "react";
import { isToken } from "../utils/token";
import { useNavigate } from "react-router-dom";

const Auth = (SpecificComponent) => {
  const navigate = useNavigate();

  const authCheck = () => {
    isToken().then((res) => {
      if (res.isLogin) {
        switch (res.userType) {
          case "일반인":
            navigate("/call");
            break;
          case "드라이버":
            navigate("/driver");
            break;
          default:
        }
      } else {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    authCheck();
  }, []);

  return <SpecificComponent />;
};

export default Auth;
