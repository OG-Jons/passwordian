import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, Box, List, ListItem, ListItemButton, TextField, AccordionSummary, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/AuthService";
import { getUserCategories, getUserPasswordsByCategory } from "../services/APIService";
import { Category, Password } from "../types";

function Passwords() {
  const [categoryPasswords, setCategoryPasswords] = useState<CategoryPasswords[]>//();
    ([{
      category: null,
      passwords: [
        {
          id: 1,
          title: "example",
          website: "example.org",
          username: "examplesuer",
          password: "examplepw",
          description: "this is a example",
          category: null,
        },
        {
          id: 2,
          title: "examasdfasdfple",
          website: "exampasdfasle.org",
          username: "asdfasdf",
          password: "sdfadfg",
          description: "this is a example",
          category: null,
        },
      ]
    },
    {
      category: {
        name: "newCategory"
      },
      passwords: [
        {
          id: 1,
          title: "example",
          website: "example.org",
          username: "examplesuer",
          password: "examplepw",
          description: "this is a example",
          category: {
            name: "newCategory"
          },
        },
        {
          id: 2,
          title: "examasdfasdfple",
          website: "exampasdfasle.org",
          username: "asdfasdf",
          password: "sdfadfg",
          description: "this is a example",
          category: {
            name: "newCategory"
          },
        },
      ]
    }
    ]);

  // useEffect(() => {
  //   getUserCategories()
  //     .then(getCategoryPasswordsFromCategory)
  //     .then((categoryPasswords1: CategoryPasswords[]) => {
  //       getUserPasswordsByCategory(null).then((pws: Password[]) => {
  //         setCategoryPasswords([...categoryPasswords1, {
  //           category: null,
  //           passwords: pws
  //         }])
  //       })
  //     });
  // }, []);

  const getCategoryPasswordsFromCategory = (categories: Category[]): CategoryPasswords[] => {
    let cpws: CategoryPasswords[] = [];
    categories.map((category: Category) => {
      getUserPasswordsByCategory(category).then((pws: Password[]) => {
        const cpw: CategoryPasswords = { category: category, passwords: pws };
        cpws.push(cpw);
      })
    })
    return cpws;
  }

  const handleChange = (
    newPassword: Password,
  ) => {
    //FIXME
    if (categoryPasswords === undefined) {
      return;
    }
    const oldCategoryPasswords: CategoryPasswords = categoryPasswords.filter((categoryPassword: CategoryPasswords) => categoryPassword.category === newPassword.category)[0];
    // if (oldCategoryPasswords === undefined) {
    //   return;
    // }
    const oldPassword: Password = oldCategoryPasswords.passwords.filter(
      (oldPassword1) => (oldPassword1.id === newPassword.id)
      )[0];
      
      
    let newPasswords = [...oldCategoryPasswords.passwords];
    newPasswords[oldCategoryPasswords.passwords.indexOf(oldPassword)] = newPassword;
    
    let newCategoryPasswords: CategoryPasswords = structuredClone(oldCategoryPasswords);
    newCategoryPasswords.passwords = newPasswords;
    
    let newCategoryPasswordss: CategoryPasswords[] = [...categoryPasswords];
    newCategoryPasswordss[newCategoryPasswordss.indexOf(oldCategoryPasswords)] = newCategoryPasswords;
  };

  const deletePassword = (
    password: Password,
  ) => {
    //TODO
  };

  const updatePasswordOnServer = (password: Password) => {
    //TODO
  };

  if (isAuthenticated()) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "center", flexDirection: "column" }}
      // }
      >
        {categoryPasswords?.map((categoryPasswords: CategoryPasswords) => {
          return (
            <Accordion style={{ margin: "15px", width: "80%" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              ><div
                style={{
                  display: "flex",
                  width: "100%",
                }}>
                  {categoryPasswords.category === null ? <p>test</p> : <p>{categoryPasswords.category.name}</p>}
                  <Button style={{color:"black", marginLeft:"auto"}} onClick={()=>window.alert('test')}>
                    <DeleteIcon style={{marginLeft:"auto"}}/>
                  </Button>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <List className="passwords">
                  {categoryPasswords.passwords.map((password: Password) => {
                    return (
                      <ListItem key={password.id}>
                        <TextField
                          id={'title' + password.id}
                          className="passwordInput"
                          label="Title"
                          variant="outlined"
                          value={password.title}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            password.title = e.target.value;
                            handleChange(password);
                          }}
                        />
                        <TextField
                          id={'website' + password.id}
                          className="passwordInput"
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
                          className="passwordInput"
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
                          className="passwordInput"
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
                          className="passwordInput"
                          label="Password"
                          variant="outlined"
                          type="password"
                          value={password.password}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            password.password = e.target.value;
                            handleChange(password);
                          }}
                        />
                        <ListItemButton className="passwordButton" onClick={() => updatePasswordOnServer(password)}>
                          <SaveIcon />
                        </ListItemButton>
                        <ListItemButton className="passwordButton" onClick={() => deletePassword(password)}>
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
      </Box>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
}

interface CategoryPasswords {
  category: Category | null;
  passwords: Password[];
}

export default Passwords;
