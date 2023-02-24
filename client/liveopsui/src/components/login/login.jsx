import "../Register/register.css"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const Login=()=>{
  const navigate=useNavigate();
  const [data,setData]=useState({userName:"",password:""});
  const loginHandler=async()=>{
         await axios.post("http://localhost:3600/api/v1/user/login",data).then((res)=>{
          if(res.data.message==="user should register")
          {
            alert("user not exist")
            navigate("/register");
          }
          else if(res.data.message==="invalid credentials")
          {
            alert("invalid credentials")
          }
          else if(res.data.message==="logged in successfully")
          {
            navigate("/main");
          }
         }).catch((err)=>{console.log(err)})
  }
  const registerSwitchHadler=()=>{
    navigate("/register");
  }
    return(
        <>
        <div className="regFormContainer">
            <h1>Login Form</h1>
             <form>
             <div>
             <label htmlFor="regformuser">UserName:</label>
               <input type="text" id="regformuser" placeholder="ex:uttej" onChange={(e)=>{setData({...data,userName:e.target.value})}}/>
               </div>
               <div>
             <label htmlFor="regformpass">Password:</label>
               <input type="text" id="regformpass" placeholder="**********" onChange={(e)=>{setData({...data,password:e.target.value})}}/>
               </div>
             </form>
             <button className="reglogButton" onClick={loginHandler}>Login</button>
             <button onClick={registerSwitchHadler}>Register</button>
        </div>
        
        </>
    )
}
export default Login;