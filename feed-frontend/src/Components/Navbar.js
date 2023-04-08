import React, { useState, useEffect } from 'react';
import logo from "./Img/logo.png"
import './Navbar.css';
import { Link } from "react-router-dom"

export default function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   setIsLoggedIn(localStorage.getItem('token') !== null);
  // }, []);
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('token') !== null);
  }, [isLoggedIn]);
  
  function handleLogout() {
    if (localStorage.getItem('token') !== null) {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      setIsLoggedIn(false);
    }
  }

 
  return (
    <div className='navbar'>
      <Link to="/">
        <img src={logo} alt="/logo" style={{ width: '200px', height: 'auto' }}/>
      </Link>
      <ul className ="nav-menu">
        {isLoggedIn ?
          <li className="logOut" onClick={handleLogout}>Log out</li> :
          <li>
            <Link className= "signUpButton" to ="/SignUp">
              SignUp
            </Link>
            <Link className= "loginButton" to ="/SignIn">
              Log In
            </Link>
          </li>
        }
      </ul>
    </div>
  )
}
