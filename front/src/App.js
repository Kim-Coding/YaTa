import { Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Call from "./pages/call";
import Auth from "./hoc/Auth";
import Driver from "./pages/driver";

const App = () => {
  return (
    <CookiesProvider>
      <Routes>
        <Route path="/" element={Auth(<Home />, false)} />
        <Route path="/signup" element={Auth(<Signup />, false)} />
        <Route path="/signin" element={Auth(<Signin />, false)} />
        <Route path="/call" element={Auth(<Call />, true)} />)
        <Route path="/driver" element={Auth(<Driver />, true)} />)
      </Routes>
    </CookiesProvider>
  );
};

export default App;
