import {createContext,useState} from 'react';
import React from 'react';

export const postContext = createContext(null);


export default function Post({children}){

const [postDetails, setPostDetails] = useState();

    return(
        <postContext.Provider value={{postDetails,setPostDetails}}>
            {children}
        </postContext.Provider>
    )
} 