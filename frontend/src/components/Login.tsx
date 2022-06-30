import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../services/AuthService'

function Login() { 
  if (isAuthenticated()) {
    return <Navigate to="/passwords" replace />
  } else {
    return <p>login</p>
  }
}

export default Login