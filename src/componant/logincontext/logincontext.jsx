import React, { createContext, useEffect, useState } from 'react'
export const LoginToken = createContext()
export default function Logincontext({ children }) {
    const [userToken,setUserToken] = useState("")
    useEffect(()=>{
        if(localStorage.getItem('localToken')){
            setUserToken(localStorage.getItem('localToken'))
        }
    },[])
  return <>
        <LoginToken.Provider value={{ userToken,setUserToken }}>
            { children }
        </LoginToken.Provider>
        </>
}
