import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CachedIcon from "@mui/icons-material/Cached";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { deleteUserCategory, deleteUserPassword } from "../services/APIService";
import { isAuthenticated } from "../services/AuthService";
import { getDecryptedUserCategories } from "../services/EncryptionService";
import { Category, Password } from "../types";
import Cookies from "js-cookie";

function Passwords(props: { masterPassword: string }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const response = await getDecryptedUserCategories(props.masterPassword);
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
    if (password.category === undefined) {
      categoryId = -1;
    } else {
      categoryId = password.category.id;
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

  const copyText = (s: string) => {
    if (window.isSecureContext) {
      try {
        navigator.clipboard.writeText(s);
      } catch (e) {
        window.alert("failed to save password to clipboard");
      }
    } else {
      window.alert("copying password is not supported in non SecureContext.");
    }
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            flexDirection: "row",
            gap: 2.5,
            flexWrap: "wrap",
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
            style={{ color: "black", marginTop: "25px" }}
          >
            New Category
          </Button>
          <Button
            href="/update-master-password"
            variant="outlined"
            style={{ color: "black", marginTop: "25px" }}
          >
            Update Master Password
          </Button>
          <Button
            variant="outlined"
            style={{ color: "black", marginTop: "25px" }}
            onClick={() => {
              Cookies.remove("token");
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </Box>
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
                          <ListItem className="password" key={password.id}>
                            <TextField
                              className="passwordInput"
                              label="Title"
                              variant="outlined"
                              value={password.title}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            <TextField
                              className="passwordInput"
                              label="Website"
                              variant="outlined"
                              value={password.website}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            <TextField
                              className="passwordInput"
                              label="Username/Email"
                              variant="outlined"
                              value={password.username}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            <TextField
                              className="passwordInput"
                              label="description"
                              variant="outlined"
                              value={password.description}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            <TextField
                              className="passwordInput"
                              label="Password"
                              variant="outlined"
                              type="password"
                              value={password.password}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            <Tooltip title="Copy Password">
                              <ListItemButton
                                className="passwordButton"
                                onClick={() => {
                                  if (password.password) {
                                    copyText(password.password);
                                  }
                                }}
                              >
                                <ContentCopyIcon />
                              </ListItemButton>
                            </Tooltip>
                            <ListItemButton
                              className="passwordButton"
                              href={`/passwords/${password.id}`}
                            >
                              <EditIcon />
                            </ListItemButton>
                            <ListItemButton
                              className="passwordButton"
                              onClick={() => deletePassword(password)}
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
        <Button
          onClick={() => {
            navigate("/password");
          }}
        >
          <CachedIcon />
        </Button>
      </Box>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default Passwords;
