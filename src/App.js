import React from 'react';
import './App.css';
import { BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login'
import { useContext,useEffect } from 'react';
import { AuthContext } from './store/firebaseContext';

function App() {

const {user}= useContext(AuthContext);
useEffect(() => {
console.log(user);
}, [])

  return (
    <div>
      <BrowserRouter>
          <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          </Routes>
      </BrowserRouter>

    </div>

  )
}

export default App;
