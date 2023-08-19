import { useEffect, useState } from "react"
import retrieveAllTodos, { deleteTodoById ,retrieveAllTodosByPage} from "./apiCall/FetchTodoInfo"
import { useAuth } from "./security/AuthContext"
import { Link ,useNavigate} from "react-router-dom"


export default function HomeComponent(){
   const authContext = useAuth()
    const [todos,setTodos] = useState([])
    const [message, setMessage] = useState(null)
    const [currentPage,setCurrentPage]=useState(0)
    const navigate = useNavigate()
    //hook use to run refreshTodos when the dependency change, [] mean run after the initial render
    useEffect( () => retrieveTodosByPage(),[currentPage,authContext.email])
    function retrieveTodosByPage(){
        retrieveAllTodosByPage(authContext.email,currentPage)
        .then((res) => {
            setTodos(res.data.content)
            }
        )
        .catch(err => console.log(err))
    }
    function deleteTodo(id){
        deleteTodoById(id)
        .then(res =>{
            setMessage(`Successfully delete todo with id: ${id}`)
            retrieveTodosByPage()
        })
        .catch(err => console.log(err))
    }
    function updateTodoById(id){
        navigate(`/updateTodo/${id}`)
    }
    function handleNext(){
        setCurrentPage(currentPage+1)
    }
    function handlePrevious(){
        setCurrentPage(currentPage-1)
    }
    return(
        <div className="container">
            <div className="home">
            <h1 className="mb-3">Welcome {authContext.email}</h1>
            <div>
                {message}
            <div>
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th>descripton</th>
                            <th>done</th>
                            <th>target/completion Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                //unique key prop for every element in the list in this case todo.id
                                <tr key={todo.id}>
                                      <td>{todo.description}</td>
                                      <td>{todo.done.toString()}</td>
                                      <td>{todo.targetDate.toString()}</td>
                                      <td><button className="btn btn-success" onClick={()=>updateTodoById(todo.id)}>Update</button></td>
                                      <td><button className="btn btn-danger" onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                    <div className="ccontainer mb-2">
                        <button className="btn btn-info" onClick={handlePrevious}>pre</button>
                        <input className="pageNumber" placeholder={`${currentPage + 1}`}></input>
                        <button className="btn btn-info" onClick={handleNext}>next</button>
                    </div>
                    <div className="container">
                        <Link to='/updateTodo'>
                        <button className="addTodoButton"  >Add Todo</button>
                        </Link>
                    </div>
            </div>
            </div>
            </div>
        </div>
    

    )
}