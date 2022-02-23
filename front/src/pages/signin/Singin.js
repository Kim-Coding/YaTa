import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { signInAxios } from "../../utils/signAxios";
import StyledDiv from "../../components/layout/StyledDiv";
import StyledForm from "../../components/layout/StyleForm";

import { useForm } from "react-hook-form";

const Signin = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const signIn = async (e) => {
    const result = await signInAxios("post", "signin", e.id, e.pw);
    result === "일반인" ? navigate("/call") : navigate("/driver");
  };

  return (
    <>
      <Link to="/">Home</Link>
      <StyledDiv>
        <h2>로그인</h2>
        <StyledForm>
          <input placeholder="아이디" {...register("id", { required: true })} />
          <input
            placeholder="비밀번호"
            type="password"
            {...register("pw", { required: true })}
          />
          <input type="submit" value="로그인" onClick={handleSubmit(signIn)} />
          <Link to="/signup">회원가입</Link>
        </StyledForm>
      </StyledDiv>
    </>
  );
};

export default Signin;
