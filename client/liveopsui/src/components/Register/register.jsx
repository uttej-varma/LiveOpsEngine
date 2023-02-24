import "./register.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
const Register=()=>{
  const navigate=useNavigate()
  const [userData,setUserData]=useState({userName:"",password:""});
  const registrationHadler=async ()=>{
        await axios.post("http://localhost:3600/api/v1/user/register",userData).then((response)=>{
          if(response.data.message==="userName already exist")
          {
            alert("user Name Already exist")
          }
          else if(response.data.message==="user Registered Successfully")
          {
               navigate("/login")
          }
        }).catch((err)=>{console.log(err)});
  }
  const loginSwitchHadler=()=>{
    navigate("/login")
  }
    return(
        <>
        <div className="regFormContainer">
            <h1>Registration Form</h1>
             <form>
             <div>
             <label htmlFor="regformuser">UserName:</label>
               <input type="text" id="regformuser" placeholder="ex:uttej" onChange={(e)=>{setUserData({...userData,userName:e.target.value})}}/>
               </div>
               <div>
             <label htmlFor="regformpass">Password:</label>
               <input type="text" id="regformpass" placeholder="**********" onChange={(e)=>{setUserData({...userData,password:e.target.value})}}/>
               </div>
             </form>
             <button className="reglogButton" onClick={registrationHadler}>Register</button>
             <button onClick={loginSwitchHadler} >Login</button>
        </div>
        </>
    )
}
export default Register;