import { Formik,Form,Field, ErrorMessage } from "formik"
import { useAuth } from "./security/AuthContext"
import { addTodo, updateTodoById ,retrieveTodoById} from "./apiCall/FetchTodoInfo";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
export default function UpdateTodoComponent(){
    const authContext=useAuth()
    const navigate = useNavigate()
    const [description,setDescription]=useState('')
    const [targetDate,setTargetDate] =useState('')
    const [done,setDone] = useState(false)
    const {id}=useParams()//fetch user id from url if user try to update todo
    useEffect( () =>{
        console.log('1 before reset field value is: ',description,targetDate);
        if(id){
            //if id exist we will set the feild initialvalue to current todo value
            retrieveTodoById(authContext.email,id)
            .then((res) => {
                console.log('success fetch to by id',res.data.targetDate);
                console.log('success fetch to by id',res.data.description);
                setDescription(res.data.description)
                setTargetDate(res.data.targetDate)
                setDone(res.data.done)
            })
            .catch(err => console.log(err))
        }
    },[authContext.email, id,done])
    console.log('2 after reset field value is: ',description,targetDate);
    return(
        <div className="container">
            <h1 className="m-5">Enter todo details</h1>
            <Formik
            //set the initial form field value
            initialValues={{ description: description || '', targetDate: targetDate || '' }}
            enableReinitialize={true}  //this prop enable form to reinitialze when initialvalues prop change
                validate={values => {
                    //initialize a error object to handle potential issue
                    const error ={}
                    if(!values.description){
                        error.description='Required'
                    }else if(values.targetDate < new Date()){
                        error.targetDate='Date must be in the future'
                    }else if(values.targetDate === new Date()){
                        setDone(true)
                    }
                    return error
                }}
                onSubmit={(values,{setSubmitting}) => {
                    //init todo object
                    const todo={
                        description:values.description,
                        done:false,
                        targetDate:values.targetDate
                    }
                    //if id exist we need to update the todo by this id intead of create new todo
                    if(id){
                        updateTodoById(authContext.email,id,todo)
                        .then((res )=> {navigate('/home')})
                        .catch((err) =>{console.log('fail to load',err)})
                    }else{
                        addTodo(authContext.email,todo)
                        .then((res )=> {navigate('/home')})
                        .catch((err) =>{console.log('fail to load',err)})
                    }
                }}
            >
                {
                ({isSubmitting}) => (
                    <Form>
                         <div className='form-field'>
                            <label className="form-label">Description</label>
                                <Field type='description' name='description'className="form-control"/>
                            <ErrorMessage name="description" component='div' className='error-message'/>
                        </div>
                        <div className='form-field'>
                            <label className="form-label">TargetDate</label>
                            <Field type='date' name='targetDate' className="form-control"/>
                            <ErrorMessage name="targetDate" component='div' className='error-message'/>
                        </div>
                        {/* disable prevent user from submiing the form multiple time */}
                            <button type="submit" className="btn btn-primary m-5" disabled={isSubmitting}>
                                submit
                            </button>
                    </Form>
                )
                }
            </Formik>
        </div>
    )
}