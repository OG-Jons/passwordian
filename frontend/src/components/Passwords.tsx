import { Box, List, ListItem, ListItemButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../services/AuthService';

function Passwords() {
    const [passwords, setPasswords] = useState<any[]>([{ name: 'test', password: 'safePassword' }])

    if (isAuthenticated()) {
        return (
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                <List>
                    {passwords.map(password => {
                        return <ListItem>
                            <TextField id="outlined-basic" label="Name" variant="outlined" />
                            <TextField id="outlined-basic" label="Username/Email" variant="outlined" />
                            <TextField id="outlined-basic" label="Password" variant="outlined" />
                            <ListItemButton style={{ height: '100vh' }}>
                                <DeleteIcon style={{ height: '100vh' }} />
                            </ListItemButton>
                        </ListItem>;
                    })}
                </List>
            </Box>
        )
    }
    else {
        return <Navigate to="/login" replace />
    }
}

export default Passwords