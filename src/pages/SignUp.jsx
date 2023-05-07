import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
//import { signInWithEmailAndPassword } from "firebase/auth";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
//import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export default function SignUp() {

  const [err, setErr] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isdonor, setIsdonor] = useState(false);
  const [isadmin, setIsadmin] = useState(false);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(email)

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            isadmin,
            isdonor,
            location,
        });
      navigate('/login');
      
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="full_container">
        <div className="left_container">
          <div className="signup_heading">
            <h2>Welcome Back</h2>
            <p>Feeding Nepal</p>
          </div>
          <div className="signup_form">
            <div className="signup_email">
              <label>Name</label>
              <input type="text" className="form-control" placeholder="Enter Name" value={displayName} onChange={(e)=>{setDisplayName(e.target.value)}}/>
            </div>
            <div className="signup_email">
              <label>Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="signup_email">
              <label>Location</label>
              <input type="text" className="form-control" placeholder="Enter Location" value={location} onChange={(e)=>{setLocation(e.target.value)}}/>
            </div>
            <div className="signup_password">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div className="signup_button">
              <button onClick={handleSubmit}>Sign Up</button>
            </div>
            {err && <span>Something went wrong</span>}
            <p>You do have an account? <Link to="/login">SignIn</Link></p>
          </div>
        </div>
        <div className="right_container">
          <p>"Throwing away food is like stealing from the table of those who are poor and hungry" <br/>
 - Pope Francis</p>
        </div>
      </div>
    </>
  )
}
