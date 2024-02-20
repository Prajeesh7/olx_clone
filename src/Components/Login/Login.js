import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Logo from "../../olx-logo.png";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleLogin = (e) => {
    e.preventDefault();
    //console.log(email);

    if (email && password) {
      //-- Checking authentication

      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          // alert('loggin succesfull');
          navigate("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  return (
    <div>
      <div className="loginParentDiv">
        <img
          width="200px"
          height="200px"
          src={Logo}
          alt="Failed to fetching image"
        ></img>
        <form onSubmit={HandleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
