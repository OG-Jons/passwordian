import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./components/Login";
import Passwords from "./components/Passwords";
import LandingPage from "./components/LandingPage";
import { isAuthenticated } from "./services/AuthService";
import { useLocation } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/app"
          element={<AuthWrapper isAuthenticated={isAuthenticated()} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/passwords" element={<Passwords />} />)
        <Route path="*" element={<p>404: Site not found</p>} />
      </Routes>
    </div>
  );
}

const AuthWrapper = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  if (isAuthenticated) {
    return <Navigate to="/passwords" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

const Header = () => {
  const location = useLocation();
  if (location.pathname === "/") return <></>;
  else return <p className="App-header">Passwordian</p>;
};

export default App;
