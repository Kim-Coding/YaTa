import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpAxios } from "../../utils/signAxios";
import StyledDiv from "../../components/layout/StyledDiv";
import StyledForm from "../../components/layout/StyleForm";
import { useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const signUp = async (e) => {
    await signUpAxios("post", "signup", e.id, e.pw, e.userType).then((res) => {
      if (res.data.result) {
        navigate("/signin", { replace: true });
        alert("회원가입에 성공하셨습니다. 로그인 후 이용해 주세요");
      }
      if (res.data.err) {
        alert("회원가입에 실패하였습니다. 아이디 중복");
      }
    });
  };

  return (
    <>
      <Link to="/">Home</Link>
      <StyledDiv>
        <h2>회원가입</h2>
        <StyledForm>
          <input placeholder="아이디" {...register("id", { required: true })} />
          <input
            type="password"
            placeholder="비밀번호"
            {...register("pw", { required: true, minLength: 5 })}
          />
          {errors.pw?.type === "minLength" && "최소 길이 5"}
          <select {...register("userType")}>
            <option value="일반인">일반인</option>
            <option value="드라이버">드라이버</option>
          </select>
          <input type="submit" onClick={handleSubmit(signUp)} />
        </StyledForm>
      </StyledDiv>
    </>
  );
};

export default Signup;
