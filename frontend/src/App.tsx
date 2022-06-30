import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./Login";
import Passwords from "./Passwords";

function App() {
  return (
    <div className="App">
      <p className="App-header">Passwordian</p>
      <Routes>
        <Route
          path="/"
          element={<AuthWrapper isAuthenticated={true} />}
          // element={isAuthenticated(true)}
        />
        <Route path="/passwords" element={<Passwords />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {/* <header className="App-header">
      </header> */}
    </div>
  );
}

// const isAuthenticated = (isAuthenticated: boolean) => {
//   if(isAuthenticated){
//     return <Passwords />
//   } else {
//     return <Login/>
//   }
// }

const AuthWrapper = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  if (isAuthenticated) {
    return <Navigate to="/passwords" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default App;
