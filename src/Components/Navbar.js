import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar(props) {


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
                <button onClick={() => props.setPopupLogin(true)}>
                  Entra
                </button>
              </li>
              <li>
                <button className='register'onClick={() => props.setPopupSignin(true)}>
                  Registrate
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="login-option">
            <ul>
              <li>
                {/* <p>Hi, {userName[0].firstName}</p> */}
              </li>
              
              <li>
                <button onClick={() => props.setUserLogin(false)}>
                  Salir
                </button>
              </li>
            </ul>
          </div>
        )}
        {/* <ul>
        <li>
          <a href="login.asp">Entra</a>
        </li>
        <li>
          <a href="signin.asp">Registrate</a>
        </li>
      </ul> */}
      </div>
    
  );
}

export default Navbar;
