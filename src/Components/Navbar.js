import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FavoriteContext from "../context/favoritesContext";
import "../styles/Navbar.css";
import { useRef, useEffect, useState } from "react";
import userImg from '../img/user.png';
import edit from '../img/edit.png';
import heart from '../img/heart.png';
import settings from '../img/settings.png';
import logoutImg from '../img/log-out.png';
import { useAuth } from "../context/AuthContext";


const { useContext } = React;


function Navbar(props) {
  const navigate = useNavigate();
  const { favoriteDogs } = useContext(FavoriteContext);
  const { user, logout } = useAuth()

  console.log("userNavbar", user)

  // const userName = props.newUsers.filter(
  //   (item) =>
  //     item.email === props.userLogin.email &&
  //     item.password === props.userLogin.password
  // );

  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current !== null && menuRef.current !== undefined) {
        if (!menuRef.current.contains(e.target)) {
          setOpen(false);
          console.log('MENUREF', menuRef.current);
        }
      }
    };

    document.addEventListener("mousedown", handler);


    return () => {
      document.removeEventListener("mousedown", handler);
    }

  });

  function DropdownItem(props) {
    return (
      <li className="dropdownItem">
        <img src={props.img}></img>
        <a onClick={props.onClick}> {props.text} </a>
      </li>
    );
  }

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navBar">
      <div className="main-navigation">
        <ul>
          <li className="perritos">PERRITOS</li>
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
          <li>
            <span><Link to="/favorites">💙{favoriteDogs.length}</Link></span>
          </li>
        </ul>
      </div>
      {user == null ? (
        <div className="login-option">
          <Link className="entra" to="/login">
            Entra
          </Link>
          <Link className="registrate" to="/signup">
            Registrate
          </Link>
        </div>
      ) : (
        <div className='menu-container' ref={menuRef}>
          <div className="menu-trigger" onClick={() => { setOpen(!open) }}>{user.displayName || user.email}</div>
          <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
            <ul>
              <DropdownItem img={userImg} text={"Mi perfil"} onClick={() => navigate('/profile')} />
              <DropdownItem img={edit} text={"Editar perfil"} />
              <DropdownItem img={heart} text={"Favoritos"} onClick={() => navigate('/favorites')} />
              <DropdownItem img={settings} text={"Settings"} />
              <DropdownItem img={logoutImg} text={"Logout"} onClick={handleSignOut}/>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
