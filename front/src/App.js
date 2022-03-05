import { Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Call from "./pages/call";
import Auth from "./hoc/Auth";
import Driver from "./pages/driver";
import Nav from "./components/Nav";

const App = () => {
  return (
    <CookiesProvider>
      <Routes>
        <Route path="/" element={Auth(Home)} />
        <Route path="/signup" element={Auth(Signup)} />

        <Route element={<Nav />}>
          <Route path="/call" element={Auth(Call)} />)
          <Route path="/driver" element={Auth(Driver)} />)
        </Route>
      </Routes>
    </CookiesProvider>
  );
};

export default App;
