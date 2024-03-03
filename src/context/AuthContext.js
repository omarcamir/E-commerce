import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider({children}){
    const [userToken, setUserToken] = useState(null)
    useEffect(()=>{
        const token = localStorage.getItem("userToken");
        token && setUserToken(token)
    },[])
    return(
        <AuthContext.Provider value={{userToken , setUserToken}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth (){
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error("useAuth must be used within a AuthContextProvider")
    return context;
}

export {AuthContextProvider , useAuth}