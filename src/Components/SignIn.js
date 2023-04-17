import React, {useState} from 'react';
import "./SignIn.css";
import { Link ,useNavigate} from 'react-router-dom';
import { useAppState } from '../store/app.state';
import axios from "axios"
import Swal from 'sweetalert2';



export default function SignIn() {

  const setToken =useAppState((state)=> state.setToken);

  const Navigate= useNavigate();
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  
  const LoginFunction= async function(){
      await axios.post(`${process.env.REACT_APP_API_URL}login`,{
      email,
      password,
  })
  .then((res)=>{
    setToken(res.data.token)
  localStorage.setItem("token", (res.data.token))
  localStorage.setItem("name", JSON.stringify(res.data.name))
  localStorage.setItem("userId",res.data.userId)
  Swal.fire({
    title: 'LogIn SucessFull',
    icon: 'success',
    confirmButtonColor: '#ad104a',
  });
  Navigate("/")
  })
.catch((err)=>{
  Swal.fire({
    title: err.response.data.message,
    icon: 'error',
    confirmButtonColor: '#ad104a',
  });
})
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
             type= "submit"  id = "logIn" value ="Sign In" onClick={LoginFunction}/>
        
            </div>
            <div className='loginForm2'>
               New to feedMaster? create an account..
                <Link to = "/signUp"><span  style={{color :"blue",cur:"pointer"}}>Sign Up</span> </Link>
             </div>
        </div>
      
    </div>
  )
}