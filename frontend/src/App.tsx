import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./components/Login";
import Passwords from "./components/Passwords";
import { isAuthenticated } from "./services/AuthService";
import EditPassword from "./components/EditPassword";
import EditCategory from "./components/EditCategory";
import CreatePassword from "./components/CreatePassword";
import CreateCategory from "./components/CreateCategory";
import UpdateMasterPassword from "./components/UpdateMasterPassword";

function App() {
  return (
    <div className="App">
      <p className="App-header">Passwordian</p>
      <Routes>
        <Route
          path="/"
          element={<AuthWrapper isAuthenticated={isAuthenticated()} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/passwords" element={<Passwords />} />
        <Route path="/passwords/:id" element={<EditPassword />} />
        <Route path="/new-password" element={<CreatePassword />} />
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

export default App;
