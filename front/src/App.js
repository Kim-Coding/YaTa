import { Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Auth from "./hoc/Auth";
import Nav from "./components/Nav";
import User from "./pages/user/main";
import Driver from "./pages/driver/main";
import UserGoDestination from "./pages/user/userGoDestination";
import DriverGoDestination from "./pages/driver/driverGoDestination";

const App = () => {
  const AuthUserPage = Auth(User);
  const AuthUserGoDestinationPage = Auth(UserGoDestination);
  const AuthDriverPage = Auth(Driver);
  const AuthDriverGoDestinationPage = Auth(DriverGoDestination);

  return (
    <CookiesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<Nav />}>
          <Route path="/user" element={<AuthUserPage />} />
          <Route
            path="/user/godestination"
            element={<AuthUserGoDestinationPage />}
          />
          <Route path="/driver" element={<AuthDriverPage />} />
          <Route
            path="/driver/godestination"
            element={<AuthDriverGoDestinationPage />}
          />
        </Route>
      </Routes>
    </CookiesProvider>
  );
};

export default App;
