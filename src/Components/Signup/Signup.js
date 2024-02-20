import React, { useState, useContext } from "react";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../store/firebaseContext";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const db = useContext(FirebaseContext);
  const [complete, setComplete] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function HandleSubmit(e) {
    e.preventDefault();

    if (userName && email && phone && password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          //  console.log(user);
          await updateProfile(user, { displayName: userName });

          try {
            const docRef = await addDoc(collection(db, "users"), {
              id: user.uid,
              name: userName,
              phone: phone,
            });

            if (docRef) {
              navigate("/login");
            }
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + ":" + errorMessage);
          setError(errorCode);
        });
    } else {
      setComplete(false);
    }
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="300px" height="300px" src={Logo} alt=""></img>
        <form onSubmit={HandleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            placeholder="enter name"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          {error ? <span style={{ color: "red" }}>{error}</span> : ""}
          <button type="submit">Signup</button>
        </form>
        <Link to="/login">Login</Link>
        {!complete ? (
          <span style={{ color: "red" }}>all field is required</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
