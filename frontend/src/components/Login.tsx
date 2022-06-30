import { Button, TextField } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../services/AuthService'

function Login() {
  if (isAuthenticated()) {
    return <Navigate to="/passwords" replace />
  } else {
    return (
      <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', }}>
        <TextField
          style={{ margin: 5 }}
          id="outlined-basic"
          label="Username"
          variant="outlined"
        />
        <TextField
          style={{ margin: 5 }}
          id="outlined-password-input"
          label="Password"
          type="password"
        />
        <Button style={{ margin: 5 }} variant="outlined">Login</Button>
      </div>
    )
  }
}

export default Login