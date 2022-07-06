import { useNavigate, useParams } from "react-router-dom";
import { Password } from "../types";
import React, { useEffect, useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getPassword, updateUserPassword } from "../services/APIService";

function EditPassword() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState<Password>();

  useEffect(() => {
    async function getData() {
      if (!isNaN(Number(id))) {
        const response = await getPassword(Number(id));
        setPassword(response);
      } else {
        alert("Invalid category id");
      }
    }

    getData().then((r) => r);
  }, []);

  const handleSave = async () => {
    if (id && password) {
      updateUserPassword(+id, password).then(() => navigate("/passwords"));
    }
  };

  return (
    <>
      <h1>Edit Password</h1>
      <Button style={{ color: "black" }} href="/passwords">
        <ArrowBackIcon />
      </Button>
      {password && (
        <List className="passwords">
          <ListItem>
            <TextField
              className="passwordInput"
              label="Title"
              variant="outlined"
              value={password.title}
              onChange={(e) =>
                setPassword({ ...password, title: e.target.value })
              }
            />
            <TextField
              className="passwordInput"
              label="Website"
              variant="outlined"
              value={password.website}
              onChange={(e) =>
                setPassword({ ...password, website: e.target.value })
              }
            />
            <TextField
              className="passwordInput"
              label="Username/Email"
              variant="outlined"
              value={password.username}
              onChange={(e) =>
                setPassword({ ...password, username: e.target.value })
              }
            />
            <TextField
              className="passwordInput"
              label="description"
              variant="outlined"
              value={password.description}
              onChange={(e) =>
                setPassword({ ...password, description: e.target.value })
              }
            />
            <TextField
              className="passwordInput"
              label="Password"
              variant="outlined"
              type="password"
              value={password.password}
              onChange={(e) =>
                setPassword({ ...password, password: e.target.value })
              }
            />
            <ListItemButton className="passwordButton" onClick={handleSave}>
              <SaveIcon />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </>
  );
}

export default EditPassword;
