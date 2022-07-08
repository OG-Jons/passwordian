import { useParams, useNavigate } from "react-router-dom";

import { Category } from "../types";
import React, { useEffect, useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { getCategory, updateUserCategory } from "../services/APIService";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    async function getData() {
      if (!isNaN(Number(id))) {
        const response = await getCategory(Number(id));
        setCategory(response);
      } else {
        alert("Invalid category id");
      }
    }

    getData().then((r) => r);
  }, []);

  const handleSave = async () => {
    if (id && category) {
      updateUserCategory(+id, category).then(() => navigate("/passwords"));
    }
  };

  return (
    <>
      <h1>Edit Category</h1>
      <Button style={{ color: "black" }} href="/passwords">
        <ArrowBackIcon />
      </Button>
      {category && (
        <List className="passwords">
          <ListItem>
            <TextField
              className="passwordInput"
              label="Title"
              variant="outlined"
              value={category.name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
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

export default EditCategory;
