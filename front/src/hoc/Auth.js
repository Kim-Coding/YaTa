import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import request from "../utils/serverAxios";
import { useCookies } from "react-cookie";

const Auth = (SpecificComponent) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const authCheck = async () => {
    try {
      const authResult = await request.get({
        uri: "/api/user/auth",
      });
      const { result, userType, accessToken, refreshToken } = authResult.data;

      if (result) {
        if (accessToken) {
          setCookie("accessToken", accessToken);
        }
        if (refreshToken) {
          setCookie("refreshToken", refreshToken);
        }
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
        removeCookie("accessToken");
        removeCookie("refreshToken");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    authCheck();
  }, []);

  return <SpecificComponent />;
};

export default Auth;
