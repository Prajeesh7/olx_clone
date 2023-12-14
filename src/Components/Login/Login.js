import React from 'react';
import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../store/firebaseContext';
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth';
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const db = useContext(FirebaseContext);

  const HandleLogin = (e)=>{
    e.preventDefault()
    //console.log(email);
    if ( email && password ){
      const auth = getAuth();
      signInWithEmailAndPassword(auth,email,password).then(()=>{
        alert('loggin succesfull');
        navigate('/');
      }).catch((error)=>{
        alert(error.message)
      })
    }
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
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
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
