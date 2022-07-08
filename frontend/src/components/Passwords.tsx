import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import {
  Accordion,
  AccordionDetails,
  Box,
  List,
  ListItem,
  ListItemButton,
  TextField,
  AccordionSummary,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/AuthService";
import { deleteUserCategory, deleteUserPassword, getUserCategories } from "../services/APIService";
import { Category, Password } from "../types";

function Passwords(props : {masterPassword : String}) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function getData() {
      const response = await getUserCategories();
      setCategories(response);
    }

    getData().then((r) => r);
  }, []);

  const deleteCategory = (id: number) => {
    deleteUserCategory(id).then(() =>
      setCategories(categories.filter((c) => c.id !== id))
    );
  };

  const deletePassword = (password: Password) => {
    let categoryId: number;
    if(password.category === undefined ){
      categoryId = -1;
    } else{
      categoryId= password.category.id; 
    }

    deleteUserPassword(password.id).then(() =>
      setCategories(
        categories.map((c) => {
          if (c.id === categoryId) {
            c.passwords = c.passwords.filter((p) => p.id !== password.id);
          }
          return c;
        })
      )
    );
  };

  if (isAuthenticated()) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Button
          href="/new-password"
          variant="outlined"
          style={{ color: "black", marginTop: "25px" }}
        >
          New Password
        </Button>
        <Button
          href="/new-category"
          variant="outlined"
          disabled={true}
          style={{ color: "black", marginTop: "25px" }}
        >
          New Category
        </Button>
        {categories.length > 0 && (
          <>
            {categories.map((category: Category) => {
              return (
                <Accordion
                  style={{ margin: "15px", width: "80%" }}
                  key={category.id}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <p>{category.name}</p>
                      <Button
                        style={{ color: "black", marginLeft: "auto" }}
                        href={`/categories/${category.id}`}
                      >
                        <EditIcon style={{ marginLeft: "auto" }} />
                      </Button>
                      <Button
                        style={{ color: "black" }}
                        onClick={() => deleteCategory(Number(category.id))}
                      >
                        <DeleteIcon style={{ marginLeft: "auto" }} />
                      </Button>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List className="passwords">
                      {category.passwords.map((password: Password) => {
                        return (
                          <ListItem key={password.id}>
                            <TextField
                              className="passwordInput"
                              label="Title"
                              variant="outlined"
                              value={password.title}
                              disabled
                            />
                            <TextField
                              className="passwordInput"
                              label="Website"
                              variant="outlined"
                              value={password.website}
                              disabled
                            />
                            <TextField
                              className="passwordInput"
                              label="Username/Email"
                              variant="outlined"
                              value={password.username}
                              disabled
                            />
                            <TextField
                              className="passwordInput"
                              label="description"
                              variant="outlined"
                              value={password.description}
                              disabled
                            />
                            <TextField
                              className="passwordInput"
                              label="Password"
                              variant="outlined"
                              type="password"
                              value={password.password}
                              disabled
                            />
                            <ListItemButton
                              className="passwordButton"
                              href={`/passwords/${password.id}`}
                            >
                              <EditIcon />
                            </ListItemButton>
                            <ListItemButton
                              className="passwordButton"
                              onClick={() =>
                                deletePassword(password)
                              }
                            >
                              <DeleteIcon />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </>
        )}
      </Box>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default Passwords;
