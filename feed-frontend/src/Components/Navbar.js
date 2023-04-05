import React from 'react';
import logo from "./Img/logo.png"
import './Navbar.css';
import {Link} from "react-router-dom"

export default function navbar() {
  return (
    <div className='navbar'>
        <Link to ="/">
        <img src={logo} alt="/logo" style={{ width: '200px', height: 'auto' }}/>
        </Link>
      <ul className ="nav-menu">
        <Link to ="/SignUp">
        <li>SignUp</li>
        </Link>
        <Link to ="/SignIn">
        <li>SignIn</li>
        </Link>
        {/* <Link to ="/Profile">
        <li>Profile</li>
        </Link> */}
      </ul>
    </div>
  )
}