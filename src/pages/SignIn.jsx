import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, doc, getDocs } from "firebase/firestore";


export default function SignIn() {

  const [err, setErr] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      let userFound = false;

      const querySnapshot = await getDocs(collection(db, "users"));




      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      
        if (doc.data().email === email && doc.data().isadmin === true) {
          console.log("Admin Found");
          navigate("/admin");
          userFound = true;
        } else if (doc.data().email === email && doc.data().isadmin === false && doc.data().isdonor === true) {
          console.log("Donor Found")
          navigate("/donor");
          userFound = true;
        } else if (doc.data().email === email && doc.data().isadmin === false && doc.data().isdonor === false) {
          console.log("Feed Found")
          navigate("/feed");
          userFound = true;
        } else {
          console.log("Nothing Found")
          userFound = true;
        }
      });
      
      if (!userFound) {
        console.log("User not found");
        setErr(true);
      }


    } catch (err) {
      setErr(true);
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
              <label>Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="signup_password">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div className="signup_button">
              <button onClick={handleSubmit}>Login</button>
            </div>
            {err && <span>Something went wrong</span>}
            <p>You don't have an account? <Link to="/signup">SignUp</Link></p>
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