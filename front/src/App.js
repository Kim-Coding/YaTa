import { Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Auth from "./hoc/Auth";
import Nav from "./components/Nav";
import User from "./pages/user/main";
import Driver from "./pages/driver/main";
import UserWaiting from "./pages/user/userWaiting";
import DriverMatching from "./pages/driver/driverMatching/DriverMatching";

const App = () => {
  const AuthUserPage = Auth(User);
  const AuthUserWaitingPage = Auth(UserWaiting);
  const AuthDriverPage = Auth(Driver);
  const AuthDriverMatchingPage = Auth(DriverMatching);

  return (
    <CookiesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<Nav />}>
          <Route path="/user" element={<AuthUserPage />} />
          <Route path="/user/waiting" element={<AuthUserWaitingPage />} />
          <Route path="/driver" element={<AuthDriverPage />} />
          <Route path="/driver/matching" element={<AuthDriverMatchingPage />} />
        </Route>
      </Routes>
    </CookiesProvider>
  );
};

export default App;
