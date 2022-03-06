import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../utils/serverAxios";
import { useCookies } from "react-cookie";

const Auth = (SpecificComponent) => {
  const AuthenticationCheck = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [isAuthChecked, setAuthChecked] = useState(false);

    useEffect(() => {
      const authResult = async () => {
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
      };
      authResult();
      setAuthChecked(true);
    }, []);

    return isAuthChecked && <SpecificComponent />;
  };

  return AuthenticationCheck;
};

export default Auth;
