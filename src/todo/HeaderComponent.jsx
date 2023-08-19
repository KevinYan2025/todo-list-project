import { Link } from "react-router-dom"
import './TodoApp.css'
import { useAuth } from  "./security/AuthContext"
export default function HeaderComponent(){
    const authContext = useAuth()
    
    return(
        <header>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bs-danger-bg-subtle">
                         {authContext.isAuthenticate &&<li className="nav-item ml-auto d-flex flex-row"><Link className="nav-link mr-6" to='/home'>Home</Link></li>}
                    <div className="loginAndLogout">
                    <ul className="navbar-nav d-flex flex-row ">
                        {!authContext.isAuthenticate &&<li className="nav-item">
                         <Link className="nav-link" to='/login'>Login</Link>
                         </li>}
                         {authContext.isAuthenticate &&<li className="nav-item">
                         <Link className="nav-link" to='/login' onClick={authContext.logout}>Logout</Link>
                         </li>}
                    </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}