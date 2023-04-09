import React, { useState, useEffect } from 'react';
import logo from "./Img/logo.png"
import './Navbar.css';
import { Link ,useNavigate} from "react-router-dom"
import { useAppState } from '../store/app.state';

export default function Navbar() {
  const Navigate = useNavigate();
const token = useAppState(state=>state.token)

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  function handleLogout() {
    if (localStorage.getItem('token') !== null) {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      Navigate("/")
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
        <li>
           <Link className='myPostButton' to="/Mypost">
            MyPost
          </Link>
          <span className="nav-menu-divider">|</span>
          <li className="logOut" onClick={handleLogout}>Log out</li> 
        </li>
          :
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