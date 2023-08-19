import { createContext, useContext, useState } from "react"

//1:create a context
export const AuthContext = createContext()
//more easier to use for other component 
export const useAuth = () => useContext(AuthContext)

//2:share the created context with other component
export default function AuthProvider({children}){
    //3:put state in the context so other component can access
    const [isAuthenticate, setAuthenticate] = useState(false)
    const [email,setEmail] = useState("user@gmail.com")


    function logout(){
        setAuthenticate(false)
    }
    
    return(
        // share number to the chiildren of provider
        <AuthContext.Provider value={{isAuthenticate, setAuthenticate, logout,email,setEmail}}>
            {children}
        </AuthContext.Provider>
    )
}