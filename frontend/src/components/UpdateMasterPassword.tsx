import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { updateMasterPassword } from "../services/APIService";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function UpdateMasterPassword() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const buttonOnClick = async () => {
    await updateMasterPassword(username, oldPassword, newPassword);
    navigate("/passwords");
  };

  return (
    <>
      {" "}
      <h1>Update Master Password</h1>
      <Button style={{ color: "black" }} href="/passwords">
        <ArrowBackIcon />
      </Button>
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
        <TextField
          style={{ margin: 5 }}
          id="username"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          style={{ margin: 5 }}
          id="old-password"
          label="Old Password"
          variant="outlined"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          style={{ margin: 5 }}
          id="new-password"
          label="New Password"
          variant="outlined"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button
          style={{ margin: 5 }}
          onClick={buttonOnClick}
          variant="outlined"
        >
          Update
        </Button>
      </Box>
    </>
  );
}
