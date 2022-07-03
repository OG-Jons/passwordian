import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { login } from "../services/APIService";
import { isAuthenticated } from "../services/AuthService";

function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(e.target.value);
  };

  if (isAuthenticated()) {
    return <Navigate to="/passwords" replace />;
  } else {
    return (
      <div
        style={{
          marginTop: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <TextField
          style={{ margin: 5 }}
          id="username"
          label="Username"
          variant="outlined"
          onChange={handleUsernameChange}
        />
        <TextField
          style={{ margin: 5 }}
          id="password"
          label="Password"
          type="password"
          onChange={handlePasswordChange}
        />
        <Button style={{ margin: 5 }} onClick={() => login(username, password)} variant="outlined">
          Login
        </Button>
      </div>
    );
  }
}

export default Login;
