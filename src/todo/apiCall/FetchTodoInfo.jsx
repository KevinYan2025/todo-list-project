import axios from "axios";

const apiClient = axios.create(
    {
        baseURL:'http://localhost:8080'
    }
)
 const retrieveAllTodos= (email) =>apiClient.get(`/${email}/todos`)
 export const deleteTodoById = (id) => apiClient.delete(`/delete/todos/${id}`)
 //send todo as request body
 export const addTodo= (email,todo) => apiClient.post(`/${email}/add/todo`,todo)
 export const updateTodoById = (email,id,todo) => apiClient.post(`/${email}/update/todos/${id}`,todo)
 export const retrieveTodoById =(email,id) => apiClient.get(`/${email}/todo/${id}`)
 //display todo at current page and 5 todos per page
 export const retrieveAllTodosByPage =(email,currentPage)=>apiClient.get(`/${email}/todosByPage?page=${currentPage}&size=${5}`)
 export default retrieveAllTodos
