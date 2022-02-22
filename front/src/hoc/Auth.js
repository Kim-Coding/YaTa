import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyAxios } from "../utils/verifyAxios";

const Auth = (SpecificComponent, needLogin) => {
  const navigate = useNavigate();

  useEffect(() => {
    verifyAxios("get", "verify").then((data) => {
      if (data.isLogin) {
        if (data.userType === "일반인") {
          navigate("/call");
        } else {
          navigate("driver");
        }
      } else {
        navigate("/");
      }
    });
  }, []);

  return SpecificComponent;
};

export default Auth;
