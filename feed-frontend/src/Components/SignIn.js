import React from 'react';
import "./SignIn.css";
// import logo from "../img/singLogo.png";
import { Link } from 'react-router-dom';



export default function signIn() {
  return (
    <div className='signIn'>
        <div>
            <div className='logInForm'>
            <div>
            <input type = "email" name= "email" id="email" placeholder='Email'/>
            </div>
            <div>
            <input type = "password" name= "password" id="password" placeholder='Password'/>
            </div>
            <input
             type= "submit"  id = "logIn" value ="Sign In"/>
        
            </div>
            <div className='loginForm2'>
               New to feedMaster? create an account..
                <Link to = "/signUP"><span  style={{color :"blue",cur:"pointer"}}>SingUp</span> </Link>
             </div>
        </div>
      
    </div>
  )
}