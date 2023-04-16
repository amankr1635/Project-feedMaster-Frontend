import React, {useState} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';

import "./SignUp.css";
import { Link,useNavigate } from 'react-router-dom';

export default function SignUP() {
  const Navigate = useNavigate();
  const [name,setName]= useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [phone,setPhone]=useState("");

  const postData= async function(){
    
  await  axios.post("https://feed-master.onrender.com/signUp",{
    name,
    email,
    phone,
    password,
})
.then((res)=>{
  Navigate("/signIn")
})
.catch((err)=>{
Swal.fire(err.response.data.message)
})

}
  return (
    <div className="signUp">
        <div className='form-container'>
            <div className='form'>
          <p id= "quotes">
            Welcome to feedMaster
          </p>
          <form >
          <div>
            <input type = "text" name= "name" id="name" value={name} placeholder='Full Name' onChange={(e)=>{setName(e.target.value)}}/>
          </div>
          <div>
            <input type = "email" name= "email" id="email" value={email} placeholder='Email'  onChange={(e)=>{setEmail(e.target.value)}}/>
          </div>
          <div>
            <input type = "number" name= "phone" id="phone" value={phone} placeholder='Phone' onChange={(e)=>{setPhone(e.target.value)}}/>
          </div>
          <div>
            <input type = "password" name= "password" id="password" value={password} placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>
          </form>
          <input type="submit" id="submit-btn" value ="Sign Up" onClick={postData}/>
        </div>
        <div className='form2'>
            Already feedMaster User ? 
            <Link to ="/signIn">         
              <span style={{color:"blue",cursor:"pointer"}}>Log In</span>
              </Link>
        </div>
        </div>
    </div>
  )
}
