import React from 'react';
import './App.css';
import { BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login'

function App() {
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
