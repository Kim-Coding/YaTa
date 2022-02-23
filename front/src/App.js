import { Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Call from "./pages/call";
import Auth from "./hoc/Auth";
import Driver from "./pages/driver";
import Nav from "./components/Nav";

const App = () => {
  return (
    <CookiesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        <Route element={<Nav />}>
          <Route path="/call" element={Auth(Call)} />)
          <Route path="/driver" element={Auth(Driver)} />)
        </Route>
      </Routes>
    </CookiesProvider>
  );
};

export default App;
