import { Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import Login from './components/Login'
import Passwords from './components/Passwords'
import { isAuthenticated } from './services/AuthService'


function App() {
  return (
    <div className="App">
      <p className="App-header">Passwordian</p>
      <Routes>
        <Route
          path="/"
          element={<AuthWrapper isAuthenticated={isAuthenticated()} />}
        />
        <Route path="/passwords" element={<Passwords />} />
        <Route path="/login" element={<Login />} />
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
