import { useNavigate } from "react-router-dom";
import { Category, Password } from "../types";
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createUserPassword, getCategory, getUserCategories } from "../services/APIService";

function CreatePassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState<Password>({} as Password);
  const [categoryId, setCategoryId] = useState<number>(-1);
  const [categories, setCategories] = useState<Category[]>([{id:-1, name: "No category"} as Category]);

  useEffect(() => {
    async function getData() {
      const response = await getUserCategories();
      setCategories(response);
    }

    getData().then((r) => r);
  }, []);

  const handleSave = async () => {
    let passwordToSave: Password = password;
    if(password.id === -1){
      passwordToSave = { ...password, category: undefined };
    }

    await createUserPassword(passwordToSave).then(() => navigate("/passwords"));
  };

  const updateCategory = (id: number) => {
    setCategoryId(id);
    const category: Category = categories.filter((category: Category) => category.id === id)[0];
    setPassword({ ...password, category: category })
  }

  return (
    <>
      <h1>New Password</h1>
      <Button style={{ color: "black" }} href="/passwords">
        <ArrowBackIcon />
      </Button>
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
          <FormControl className="passwordSelect">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={categoryId}
              label="Category"
              onChange={(e) => {
                updateCategory(e.target.value as number);
              }}
            >
              {categories.map((category:Category) => {
                return <MenuItem value={category.id}>{category.name}</MenuItem>
              })}
            </Select>
          </FormControl>
          <ListItemButton className="passwordButton" onClick={handleSave}>
            <SaveIcon />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}

export default CreatePassword;
