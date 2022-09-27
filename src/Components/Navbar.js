import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FavoriteContext from "../context/favoritesContext";
import "../styles/Navbar.css";
import { useRef, useEffect, useState, useContext } from "react";
import userImg from '../img/user.png';
import edit from '../img/edit.png';
import heart from '../img/heart.png';
import envelope from '../img/envelope.png';
import logoutImg from '../img/log-out.png';
import { AuthContext } from "../context/auth";
import { auth, db } from "../firebase";
import { signOut, getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";

function Navbar(props) {

  const [registeredName, setRegisteredName] = useState()

  const navigate = useNavigate();
  const { favoriteDogs } = useContext(FavoriteContext);
  //const { user } = useAuth()
  const { user } = useContext(AuthContext)

  // async function getRegisteredName() {
  //   const auth = getAuth();
  //   const docRef = doc(db, "users", auth.currentUser.uid);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     setRegisteredName(docSnap.data().name)
  //     console.log("Document data:", docSnap.data());

  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   }

  // }

  // console.log(registeredName)

  // useEffect(() => getRegisteredName, [user])


  const [open, setOpen] = useState(false);


  const logout = () => signOut(auth);
  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/')
      props.setFavorites([])
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
           {/*  <li>
              <Link to="About">Que es Perritos</Link>
            </li> */}

            <li>
              <Link to="/posts">Difunde</Link>
            </li>
            <li>
              <Link to="/chat">Chatea</Link>
            </li>
          </ul>
        </div>
        <button className=" text-xl sm:text-2xl text-primary-focus hover:text-primary-content">PERRITOS</button>
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
         {/*  <li>
            <Link to="About">Que es Perritos</Link>
          </li> */}
          <li>
            <Link to="/chat">Chatea</Link>
          </li>
          <li>
            <Link to="/posts">Difunde</Link>
          </li>
        </ul>
      </div>

      {user === null ? (
        <div className="navbar-end">
          <Link className="btn btn-primary btn-outline mx-1" to="/login">
            Entra
          </Link>
          <Link className="btn btn-primary" to="/signup">
            Registrate
          </Link>
        </div>
      ) : (
        <div className="navbar-end">
          <Link to="/favorites">
            <button className="btn btn-circle btn-outline btn-primary">
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
            <label tabIndex={0} className="btn btn-primary m-1">
              {user.displayName || props.registeredName || user.email}
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
                <Link to="/chat">Mensajes</Link>
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
