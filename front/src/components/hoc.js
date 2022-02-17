import { useSelector } from "react-redux";

const Auth = (SpecificComponent, option) => {
  const AuthenticationCheck = (props) => {
    let user = useSelector((state) => state.user);
    let isAuth = localStorage.getItem("token");
    console.log(isAuth === null);

    if (isAuth === null) {
      if (option) {
        props.history.push("/login");
      }
    } else {
      if (option === false) {
        props.history.push("/");
      }
    }

    return <SpecificComponent {...props} user={user} />;
  };

  return AuthenticationCheck;
};

export default Auth;
