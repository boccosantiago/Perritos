import { FaHeart } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import React from "react";
import '../styles/Profile.css'
import { useAuth } from "../context/AuthContext";

export default function Profile() {

    const { user } = useAuth()
    console.log(user)
    console.log(user.photoURL)

    return (
        <div className="profile-container">
            <h1>Mi Perfil</h1>
            <div id="container__info">
                {/* {user ?
                    <div>
                        <img alt="imgProfile" src={user.photoURL} />
                        <p>{user.displayName}</p>
                        <p>{user.email}</p>
                        <p>Formulario</p></div>
                    : <div></div>}
 */}

            </div>
            <div id="container__emoticonos">
                <FaHeart />
                <button>Mis favoritos</button>
                <MdExitToApp />
                <button>Salir</button>
            </div>
        </div>
    )
}
