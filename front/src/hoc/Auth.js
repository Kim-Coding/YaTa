import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isToken } from "../utils/token";

const Auth = (SpecificComponent, needLogin = null) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isToken(), needLogin);
    if (isToken()) {
      return navigate("/call");
    } else {
      if (needLogin) {
        return navigate("/signin");
      } else {
        return navigate("/");
      }
    }
  }, [isToken()]);

  return SpecificComponent;
};

export default Auth;
