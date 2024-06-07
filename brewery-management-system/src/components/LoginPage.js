import React,{useState} from 'react'
import { Link,useNavigate} from 'react-router-dom'
import login from '../assets/login-svg.svg'
import '../styles/LoginPage.css'
import userService from '../services/UserService' 
import { useUser } from '../context/userContext'

export default function LoginPage() {
    const {user,setUser} = useUser();
    const Navigate = useNavigate();
    const [display,setDisplay] = useState(false)
    const [message,setMessage] = useState('')
    const [data, setData] = useState({userEmail:'',password:''}) 
    const handleSubmit = async (e) =>{
        setDisplay(true);
        e.preventDefault();
        try{
            const response = await userService.login(data);
            const status = response.status;
            setMessage(response.data);
            if(status === 200){ 
                setUser({emailId:data.userEmail,name:response.data});
                setTimeout(()=>{
                    setDisplay(false);
                    Navigate('/')
                },2000)
            }
        }catch(err){
            setMessage(err.response.data);
            console.log(err.data);
        }
        setTimeout(()=>{
            setDisplay(false);
        },2000)

    }
    return (
        <div className="login-page">
            <div className="login-img">
                <img src={login} alt="" />
            </div>
            <div className="login-form">
                <p className="login-txt">Login</p>
                <form action="">
                    <div className="form-component">
                        <label htmlFor="username"></label>
                        <input type="text" 
                            id="username" 
                            value={data.userEmail}  
                            onChange={(e)=>setData({...data,userEmail:e.target.value})}
                            placeholder="Enter UserEmail"
                            required />
                    </div>
                    <div className="form-component">
                        <label htmlFor="password"></label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Enter Password"
                            value={data.password}
                            onChange={(e)=>setData({...data,password:e.target.value})} 
                            required/>
                    </div>
                    <div className="btn-container">
                        <button type="submit" onClick={handleSubmit}>Login</button>
                    </div>
                    {
                        display &&
                        <div className="loader">
                            {message}
                        </div>
                    }
                </form>
                <div className="new-user">
                    Not registered? <Link to="/signup">Create an account</Link>
                </div>
            </div>
        </div>
    )
}
