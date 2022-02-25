import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import request from "../utils/axios";

const Auth = (SpecificComponent) => {
  const navigate = useNavigate();

  const authCheck = async () => {
    try {
      const authResult = await request.get({
        uri: "/api/user/auth",
      });
      const { result, userType } = authResult.data;
      if (result) {
        switch (userType) {
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
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    authCheck();
  }, []);

  return <SpecificComponent />;
};

export default Auth;
