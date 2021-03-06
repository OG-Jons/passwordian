import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./components/Login";
import Passwords from "./components/Passwords";
import LandingPage from "./components/LandingPage";
import { isAuthenticated } from "./services/AuthService";
import { useLocation } from "react-router-dom";
import EditPassword from "./components/EditPassword";
import EditCategory from "./components/EditCategory";
import CreatePassword from "./components/CreatePassword";
import CreateCategory from "./components/CreateCategory";
import UpdateMasterPassword from "./components/UpdateMasterPassword";
import { useState } from "react";

function App() {
  const [masterPassword, setMasterPassword] = useState<string>("");


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/app"
          element={<AuthWrapper isAuthenticated={isAuthenticated()} />}
        />
        <Route path="/login" element={<Login setMasterPassword={setMasterPassword}/>} />
        <Route path="/passwords" element={<Passwords masterPassword={masterPassword}/>} />
        <Route path="/passwords/:id" element={<EditPassword masterPassword={masterPassword}/>} />
        <Route path="/new-password" element={<CreatePassword masterPassword={masterPassword}/>} />
        <Route path="/categories/:id" element={<EditCategory />} />
        <Route path="/new-category" element={<CreateCategory />} />
        <Route
          path="/update-master-password"
          element={<UpdateMasterPassword />}
        />
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
