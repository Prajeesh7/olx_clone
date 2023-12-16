import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/firebaseContext';
import { signOut, getAuth } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'

function Header() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span className='login'>{ user ? `Welcome ${user.displayName}` : <Link to='/login'>Login</Link> }</span>
          <hr />
        </div>
        {user ? <span className='logout' onClick={() => {
          const auth = getAuth();
          signOut(auth).then(() => {
            setUser('');
            navigate('/');
          }).catch((err) => {
            console.log('logout error' + err);
          })
        }} >Logout</span> : null}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={()=>{
              navigate('/create');
            }}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
