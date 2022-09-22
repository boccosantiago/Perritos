import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FavoriteContext from "../context/favoritesContext";
import "../styles/Navbar.css";
import { useRef, useEffect, useState, useContext } from "react";
import userImg from "../img/user.png";
import edit from "../img/edit.png";
import heart from "../img/heart.png";
import envelope from "../img/envelope.png";
import logoutImg from "../img/log-out.png";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { favoriteDogs } = useContext(FavoriteContext);
  const { user, logout } = useAuth();
  console.log(favoriteDogs);
  console.log("userNavbar", user);

  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current !== null && menuRef.current !== undefined) {
        if (!menuRef.current.contains(e.target)) {
          setOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
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
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/main">Adopta</Link>
            </li>
            <li>
              <Link to="/shelters">Protectoras</Link>
            </li>
            <li>
              <Link to="About">Que es Perritos</Link>
            </li>

            <li>
              <Link to="/posts">Difunde</Link>
            </li>
          </ul>
        </div>
        <a className=" btn btn-secondary normal-case text-xl 	">PERRITOS</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/main">Adopta</Link>
          </li>
          <li>
            <Link to="/shelters">Protectoras</Link>
          </li>
          <li>
            <Link to="About">Que es Perritos</Link>
          </li>

          <li>
            <Link to="/posts">Difunde</Link>
          </li>
        </ul>
      </div>

      {user === null ? (
        <div className="navbar-end">
          <Link className="btn mx-5" to="/login">
            Entra
          </Link>
          <Link className="btn" to="/signup">
            Registrate
          </Link>
        </div>
      ) : (
        <div className="navbar-end">
          <Link to="/favorites">
            <button className="btn btn-circle btn-outline btn-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </Link>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-outline btn-primary m-1">
              {user.displayName || user.email}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile">Mi perfil</Link>
              </li>
              <li>
                <Link to="/favorites">Favoritos</Link>
              </li>
              <li>
                <Link to="/messages">Mensajes</Link>
              </li>
              <li>
                <p onClick={handleSignOut}>Logout</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
