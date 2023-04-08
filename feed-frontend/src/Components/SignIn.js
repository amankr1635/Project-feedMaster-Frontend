import React, {useState} from 'react';
import "./SignIn.css";
import { Link ,useNavigate} from 'react-router-dom';
import axios from "axios"


export default function SignIn() {
  
  const Navigate= useNavigate();
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  
  const LoginPage= async function(){
    if(email === "" && password === "") {
      window.alert("Please enter Email and Password.");
      return;
    }
    if(email===""){
      window.alert("Please enter your Email.")
      return;
    }
    if(password===""){
      window.alert("Please enter your Password.")
      return;
    }
    const data=  await axios.post("http://localhost:3001/login",{
      email,
      password,
  });


if(data.data.status===true){
  localStorage.setItem("token", (data.data.token))
  localStorage.setItem("name", (data.data.name))

  Navigate("/")
}
else{
  window.alert(data.data.message)
}
}

  return (
    <div className='signIn'>
        <div>
            <div className='logInForm'>
            <div>
            <input type = "email" name= "email" id="email" value={email} placeholder='Email'onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div>
            <input type = "password" name= "password" id="password"value={password} placeholder='Password'onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <input
             type= "submit"  id = "logIn" value ="Sign In" onClick={LoginPage}/>
        
            </div>
            <div className='loginForm2'>
               New to feedMaster? create an account..
                <Link to = "/signUp"><span  style={{color :"blue",cur:"pointer"}}>Sign Up</span> </Link>
             </div>
        </div>
      
    </div>
  )
}