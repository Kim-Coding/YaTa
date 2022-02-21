import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isToken } from "../utils/token";

const Auth = (SpecificComponent, needLogin) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isToken()) {
      return navigate("/call");
    } else {
      if (!needLogin) {
        return navigate("/");
      }
    }
  }, [isToken()]);

  return SpecificComponent;
};

export default Auth;
