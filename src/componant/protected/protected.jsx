import React, { useContext } from 'react'
import { LoginToken } from '../logincontext/logincontext'
import Login from '../login/login'
import { Navigate } from 'react-router-dom'

export default function Protected({ children }) {
    const { userToken } = useContext(LoginToken)
  return <>
        {
            userToken ? children : <Login/>
        }
    </>
}
