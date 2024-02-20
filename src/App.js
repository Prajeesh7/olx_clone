import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import View from './Pages/ViewPost'
import Post from './store/postContext'
import Create from './Components/Create/Create';
import { useContext, useEffect } from 'react';
import { AuthContext } from './store/firebaseContext';

function App() {

  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    // console.log(user);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {

      if (user) {
        setUser(user);
      } else {
        console.log('User not found'); 
      }
    })

  })

  return (

    <div>
      <Post>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/create' element={<Create />} />
            <Route path='/view' element={<View />} />
          </Routes>
        </BrowserRouter>
      </Post>
    </div>

  )
}

export default App;
