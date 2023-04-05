import React from 'react';
import "./SignUp.css";
import { Link } from 'react-router-dom';

export default function SignUP() {
  return (
    <div className="signUp">
        <div className='form-container'>
            <div className='form'>
          <p id= "quotes">
            Welcome to feedMaster
          </p>
          <div>
            <input type = "text" name= "name" id="name" placeholder='Full Name'/>
          </div>
          <div>
            <input type = "email" name= "email" id="email" placeholder='Email'/>
          </div>
          <div>
            <input type = "phone" name= "phone" id="phone" placeholder='Phone'/>
          </div>
          <div>
            <input type = "password" name= "password" id="password" placeholder='Password'/>
          </div>
          <input type="submit" id="submit-btn" value ="Sign Up"/>
        </div>
        <div className='form2'>
            Already feedMaster User ? 
            <Link to ="/signIn">         
              <span style={{color:"blue",cursor:"pointer"}}>Sign In</span>
              </Link>
        </div>
        </div>
    </div>
  )
}