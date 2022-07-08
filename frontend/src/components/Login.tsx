import { Box, Button, Tab, Tabs, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { isAuthenticated, signup, login } from "../services/AuthService";

function Login() {
  const [tabValue, setTabValue] = useState(0);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getButtonLabel = () => {
    if (tabValue === 0) {
      return "Login";
    } else {
      return "Signup";
    }
  };

  const buttonOnClick = () => {
    if (tabValue === 0) {
      login(username, password).then(()=>setTimeout(()=>navigate("/"),500));
    } else {
      signup(username, password).then(()=>setTimeout(()=>navigate("/"),500));
    }
  };

  if (isAuthenticated()) {
    return <Navigate to="/passwords" replace />;
  } else {
    return (
      <Box
        sx={{ width: "100%" }}
        style={{
          marginTop: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Login" />
            <Tab label="Signup" />
          </Tabs>
        </Box>
        <TextField
          style={{ margin: 5, marginTop: 10}}
          id="username"
          label="Username"
          variant="outlined"
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          style={{ margin: 5 }}
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          style={{ margin: 5 }}
          onClick={buttonOnClick}
          variant="outlined"
        >
          {getButtonLabel()}
        </Button>
      </Box>
    );
  }
}

export default Login;
