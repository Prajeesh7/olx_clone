import React from 'react'
import { createContext,useState } from "react";

export const FirebaseContext = createContext('null')
export const AuthContext = createContext('null')

export default function Context (props){
    const [user,setUser] = useState('hello')
    const {children} = props
    return(
       <AuthContext.Provider value={{user}}>
         {children}
       </AuthContext.Provider>
    )

}