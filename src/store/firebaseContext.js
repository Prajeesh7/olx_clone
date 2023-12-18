import React from 'react'
import { createContext, useState } from "react";

export const FirebaseContext = createContext('null')
export const AuthContext = createContext('null')

export default function Context(props) { 
  
  const [user, setUser] = useState(null)
  const { children } = props

  return (
    <AuthContext.Provider value={{ user,setUser }}>
      {children}
    </AuthContext.Provider>
  )

}