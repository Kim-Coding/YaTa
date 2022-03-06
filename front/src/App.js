import { Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Call from "./pages/call";
import Auth from "./hoc/Auth";
import Driver from "./pages/driver";
import Nav from "./components/Nav";
import Chatting from "./pages/chatting";

const App = () => {
  const AuthCallPage = Auth(Call);
  const AuthDriverPage = Auth(Driver);

  return (
    <CookiesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<Nav />}>
          <Route path="/chatting" element={<Chatting />} />
          <Route path="/call" element={<AuthCallPage />} />)
          <Route path="/driver" element={<AuthDriverPage />} />)
        </Route>
      </Routes>
    </CookiesProvider>
  );
};

export default App;
