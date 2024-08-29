import React, { useContext } from 'react'
import { LoginToken } from '../logincontext/logincontext'
import { Navigate } from 'react-router-dom'

export default function SignProtected({ children }) {
    const { userToken } = useContext(LoginToken)
  return (
    <>
    { 
        userToken ? <Navigate to={"/"}/> : children 
    }
    </>
  )
}
