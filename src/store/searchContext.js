import React,{ useState} from "react";
import { createContext } from "react";

export const searchContext = createContext(null);

export default function Search ({Children}){

    const [searchProduct,setSearchProduct] = useState();

    return(
        <searchContext.Provider value={{searchProduct,setSearchProduct}}>
            {Children}
        </searchContext.Provider>
    )
};