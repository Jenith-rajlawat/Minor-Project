import React, { useState, useEffect } from "react"; //We import the useState Hook from React. It lets us keep local state in a function component.
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import logowhite from '../images/logowhite.png';


function Navbar() {
  const [click, setClick] = useState(false); //click is defined and initialized to false at first
  const [button, setButton] = useState(true);

  
  return (
    <>
        <div className="navbar">
            <Link to="/" className="navbar-logo" >
                <img src={logowhite} width="100" alt="Logo" />
            </Link>

            <ul className="nav-menu">
                <li className="nav-item">
                <Link to="/" className="nav-links" >Home</Link>
                </li>
                <li className="nav-item">
                <Link
                    to="/ourmission"
                    className="nav-links">Our Mission</Link>
                </li>
                <li className="nav-item">
                <Link
                    to="/aboutus"
                    className="nav-links">About Us</Link>
                </li>
                <li className="nav-item">
                <Link
                    to="/signup"
                    className="nav-links">Sign Up</Link>
                </li>
                <li className="nav-item">
                <Link
                    to="/admin"
                    className="nav-links">Admin</Link>
                </li>
            </ul>
          
        </div>
    </>
  );
}

export default Navbar;
