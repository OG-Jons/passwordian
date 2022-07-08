import { useNavigate } from "react-router-dom";

import { Category } from "../types";
import React, { useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { createUserCategory } from "../services/APIService";

function CreateCategory() {
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category>({} as Category);

  const handleSave = async () => {
    await createUserCategory(category).then(() => navigate("/passwords"));
  };

  return (
    <>
      <h1>Edit Category</h1>
      <Button style={{ color: "black" }} href="/passwords">
        <ArrowBackIcon />
      </Button>
      <List className="passwords">
        <ListItem>
          <TextField
            className="passwordInput"
            label="Title"
            variant="outlined"
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
          />
          <ListItemButton className="passwordButton" onClick={handleSave}>
            <SaveIcon />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}

export default CreateCategory;
