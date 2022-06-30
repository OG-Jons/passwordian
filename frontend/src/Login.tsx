import React from 'react'
import { Navigate } from 'react-router-dom'

function Login() {
  const isAuthenticated = true;
  
  if (isAuthenticated) {
    return <Navigate to="/passwords" replace />
  } else {
    return <p>login</p>
  }
}

export default Login