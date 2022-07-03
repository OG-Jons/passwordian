// import { Password } from '@mui/icons-material';
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, List, ListItem, ListItemButton, TextField } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/AuthService";
import { Password } from "../types";

function Passwords() {
  const [passwords, setPasswords] = useState<Password[]>([
    {
      id: 1,
      title: "example",
      website: "example.org",
      username: "examplesuer",
      password: "examplepw",
      description: "this is a example",
      // user: ,
    },
    {
      id: 2,
      title: "examasdfasdfple",
      website: "exampasdfasle.org",
      username: "asdfasdf",
      password: "sdfadfg",
      description: "this is a example",
      // user: ,
    },
  ]);

  const [entry, setEntry] = useState<string>();

  const handleChange = (
    password: Password,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const pw: Password = passwords.filter(
      (password) => (password = password)
    )[0];
    passwords.splice(passwords.indexOf(pw));
    setPasswords([...passwords, pw]);
    console.log(pw);
    updatePasswordsOnServer();
  };

  const updatePasswordsOnServer = () => {
    //TODO
  };

  if (isAuthenticated()) {
    return (
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <List>
          {passwords.map((password) => {
            return (
              <ListItem key={password.id}>
                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  value={password.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    password.title = e.target.value;
                    setTimeout(() => handleChange(password, e), 0);
                  }}
                ></TextField>
                <TextField
                  id="outlined-basic"
                  label="website"
                  variant="outlined"
                  value={password.website}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    password.website = e.target.value;
                    handleChange(password, e);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Username/Email"
                  variant="outlined"
                  value={password.username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    password.username = e.target.value;
                    handleChange(password, e);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="description"
                  variant="outlined"
                  value={password.description}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    password.description = e.target.value;
                    handleChange(password, e);
                  }}
                />
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    password.password = e.target.value;
                    handleChange(password, e);
                  }}
                />
                <ListItemButton>
                  <DeleteIcon />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default Passwords;
