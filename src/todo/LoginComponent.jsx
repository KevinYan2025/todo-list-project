import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./security/AuthContext"
import retrieveAllTodos from "./apiCall/FetchTodoInfo"
export default function LoginComponent(){

    const [password,setPassword]=useState("")
    const [errorMessage,setErrorMessage]=useState(null)
    const authContext = useAuth()
    const navigate=useNavigate()
    function handleEmailChange(event){
        authContext.setEmail(event.target.value)
    }
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    function verifyCredential(){

        if(authContext.email === "user@gmail.com" && password === "123"){
            setErrorMessage(false)
            authContext.setAuthenticate(true);
            authContext.setAuthenticate(true)
            retrieveAllTodos(authContext.email)
            navigate(`/home`)
        }else{
            setErrorMessage(true)
            authContext.setAuthenticate(false)
        }
    }

    return(
        <div className="container login">
            <h1>Todo Management Application</h1>
            {/* show errormessage only when errorMessage is true */}
            {errorMessage && <div className="errorMessage m-4">Authenticate Fail, Please Check Your Credential</div>}
            <div className="container mt-5 ">
                <form className=" loginForm">
                     <div class="form-floating mb-3" >
                        <input type="email" class="form-control" id="floatingInput" 
                        placeholder="name@example.com" value={authContext.email} onChange={handleEmailChange}/>
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword"
                         placeholder="Passrd" value={password} onChange={handlePasswordChange}/>
                        <label for="floatingPassword">Password</label>
                    </div>
                    <div>
                        <button type="button" className="btn btn-success mt-3" onClick={verifyCredential}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}