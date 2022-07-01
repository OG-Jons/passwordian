import DeleteIcon from '@mui/icons-material/Delete';
import { Box, List, ListItem, ListItemButton, TextField } from '@mui/material';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/AuthService';
import { Password } from '../types';

function Passwords() {
    const [passwords, setPasswords] = useState<Password[]>([{
            id: 1,
            title: 'example',
            website: 'example.org',
            username: '',
            password: 'examplepw',
            description: 'this is a example',
            // user: ,
         }])

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