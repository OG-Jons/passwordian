import { Box, List, ListItem, ListItemButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react'
import { Navigate } from 'react-router-dom';

function Passwords() {
    const [passwords, setPasswords] = useState<any[]>([{ name: 'test', password: 'safePassword' }])

    const isAuthenticated = true;

    if (isAuthenticated) {
        return (
            // <Box sx={{ background: "#444" }}>
            <Box>
                <List>
                    {passwords.map(password => {
                        return <ListItem>
                            <ListItemButton>
                                <TextField id="outlined-basic" label="Name" variant="outlined" />
                                <TextField id="outlined-basic" label="Username/Email" variant="outlined" />
                                <TextField id="outlined-basic" label="Password" variant="outlined" />
                                <DeleteIcon />
                            </ListItemButton>
                        </ListItem>;
                    })}
                </List>
            </Box>

        )
    }
    else {
        return <Navigate to="/passwords" replace />
    }
}

export default Passwords