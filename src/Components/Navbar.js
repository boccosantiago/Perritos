import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar(props) {

  const userName = props.newUsers.filter(
    (item) =>
      item.email === props.userLogin.email &&
      item.password === props.userLogin.password
  );


  return (
    <div className="navBar">
        <div className="main-navigation">
      <ul>
        <li className="perritos">
          PERRITOS
        </li>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/main">Adopta</Link>
        </li>
        <li>
          <a href="contact.asp">Protectoras</a>
        </li>
        <li>
          <a href="about.asp">Que es Perritos</a>
        </li>
        </ul>
        </div> 
        {!props.isLoggedIn ? (
          <div className="login-option">
            <ul>
              <li>
                <button className="entra" onClick={() => props.setPopupLogin(true)}>
                  Entra
                </button>
              </li>
              <li>
                <button className='registrate'onClick={() => props.setPopupSignin(true)}>
                  Registrate
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="login-option">
            <ul>
              <li>
               {<Link className="user-text" to='/profile'>{userName[0].firstName}</Link>}
              </li>
              
              <li>
                <button className='entra' onClick={() => props.setUserLogin(false)}>
                  Salir
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    
  );
}

export default Navbar;
