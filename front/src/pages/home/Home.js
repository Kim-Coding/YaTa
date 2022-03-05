import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

import StyledDiv from "../../components/layout/StyledDiv";
import StyledForm from "../../components/layout/StyleForm";
import request from "../../utils/serverAxios";

const initialInputs = {
  id: "",
  pw: "",
};

const Home = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(initialInputs);
  const { id, pw } = inputs;
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onSummitSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await request.post({
        uri: "/api/user/signin",
        data: { id, pw },
      });
      const { accessToken, refreshToken, userType } = result.data;
      setCookie("accessToken", accessToken);
      setCookie("refreshToken", refreshToken);
      userType === "일반인" ? navigate("/call") : navigate("/driver");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledDiv>
      <h2>로그인</h2>
      <StyledForm>
        <input placeholder="아이디" name="id" onChange={onChangeInput} />
        <input
          placeholder="비밀번호"
          name="pw"
          onChange={onChangeInput}
          type="password"
        />
        <input type="submit" value="로그인" onClick={onSummitSignIn} />
        <Link to="/signup">회원가입</Link>
      </StyledForm>
    </StyledDiv>
  );
};

export default Home;
