import { Routes,Route, BrowserRouter,Navigate } from "react-router-dom"
import LoginComponent from "./LoginComponent"
import HeaderComponent from "./HeaderComponent"
import FooterComponent from "./FooterComponent"
import HomeComponent from "./HomeComponent"
import UpdateTodoComponent from "./UpdateTodoComponent"
import './TodoApp.css'
import NotFound from "./NotFound"
import AuthProvider ,{useAuth}from "./security/AuthContext"
//use to see if a user is authenticated, if yes the children component
//will be allow to access and vice versa, the children component should be wrap by the Authenticated Route component
function AuthenticatedRoute({children}){
    const authContext = useAuth()

    if(authContext.isAuthenticate){
        return children
    }
    return <Navigate to="/login"/>

}

export default function TodoApp(){
    return(
        <div className="todoApp">
            {/* use AuthProvide to wrap all the compnent that need to be authenticate  */}
            <AuthProvider> 
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    <Route path='/' element={
                    <LoginComponent/>
                    }></Route>
                    <Route path='/login' element={
                    <LoginComponent/>
                    }></Route>
                    <Route path='/home' element={
                    <AuthenticatedRoute><HomeComponent/></AuthenticatedRoute>
                    }></Route>
                    <Route path='/updateTodo' element={
                    <AuthenticatedRoute><UpdateTodoComponent/></AuthenticatedRoute>
                    }></Route>
                     <Route path='/updateTodo/:id' element={
                    <AuthenticatedRoute><UpdateTodoComponent/></AuthenticatedRoute>
                    }></Route>
                    <Route path='*' element={<NotFound/>}/>

                </Routes>
                <FooterComponent/>
            </BrowserRouter>
            </AuthProvider>
            
        </div>
    )
}