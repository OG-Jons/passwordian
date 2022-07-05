import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { Box, List, ListItem, ListItemButton, TextField } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserCategories, getUserPasswordsByCategory } from "../services/AuthService";
import { Category, Password } from "../types";

function Passwords() {
  const [passwords, setPasswords] = useState<Password[]>([
    {
      id: 1,
      title: "example",
      website: "example.org",
      username: "examplesuer",
      password: "examplepw",
      description: "this is a example",
    },
    {
      id: 2,
      title: "examasdfasdfple",
      website: "exampasdfasle.org",
      username: "asdfasdf",
      password: "sdfadfg",
      description: "this is a example",
    },
  ]);

  const handleChange = (
    newPassword: Password,
  ) => {
    const oldPassword: Password = passwords.filter(
      (oldPassword1) => (oldPassword1.id === newPassword.id)
    )[0];

    let newPasswords = [...passwords];
    newPasswords[passwords.indexOf(oldPassword)] = newPassword;

    setPasswords(newPasswords);
  };

  const updatePasswordsOnServer = (password: Password) => {
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
        {getUserCategories().map((category: Category) => {
          return (
            <>
              <p>{category.name}</p>
              <List>
                {getUserPasswordsByCategory(category).map((password: Password) => {
                  return (
                    <ListItem key={password.id}>
                      <TextField
                        id={'title' + password.id}
                        label="Title"
                        variant="outlined"
                        value={password.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          password.title = e.target.value;
                          handleChange(password);
                        }}
                      ></TextField>
                      <TextField
                        id={'website' + password.id}
                        label="Website"
                        variant="outlined"
                        value={password.website}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          password.website = e.target.value;
                          handleChange(password);
                        }}
                      />
                      <TextField
                        id={'username' + password.id}
                        label="Username/Email"
                        variant="outlined"
                        value={password.username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          password.username = e.target.value;
                          handleChange(password);
                        }}
                      />
                      <TextField
                        id={'description' + password.id}
                        label="description"
                        variant="outlined"
                        value={password.description}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          password.description = e.target.value;
                          handleChange(password);
                        }}
                      />
                      <TextField
                        id={'password' + password.id}
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          password.password = e.target.value;
                          handleChange(password);
                        }}
                      />
                      <ListItemButton onClick={() => updatePasswordsOnServer(password)}>
                        <SaveIcon />
                      </ListItemButton>
                      <ListItemButton>
                        <DeleteIcon />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </>)
        })}
        <p>Uncategorized</p>
        <List>
          {getUserPasswordsByCategory(null).map((password: Password) => {
            return (
              <ListItem key={password.id}>
                <TextField
                  id={'title' + password.id}
                  label="Title"
                  variant="outlined"
                  value={password.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    password.title = e.target.value;
                    handleChange(password);
                  }}
                ></TextField>
                <TextField
                  id={'website' + password.id}
                  label="Website"
                  variant="outlined"
                  value={password.website}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    password.website = e.target.value;
                    handleChange(password);
                  }}
                />
                <TextField
                  id={'username' + password.id}
                  label="Username/Email"
                  variant="outlined"
                  value={password.username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    password.username = e.target.value;
                    handleChange(password);
                  }}
                />
                <TextField
                  id={'description' + password.id}
                  label="description"
                  variant="outlined"
                  value={password.description}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    password.description = e.target.value;
                    handleChange(password);
                  }}
                />
                <TextField
                  id={'password' + password.id}
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    password.password = e.target.value;
                    handleChange(password);
                  }}
                />
                <ListItemButton onClick={() => updatePasswordsOnServer(password)}>
                  <SaveIcon />
                </ListItemButton>
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
