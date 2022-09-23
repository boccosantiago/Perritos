import { FaHeart } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import React from "react";
import '../styles/Profile.css'
import { useAuth } from "../context/AuthContext";

import userImg from '../img/user.png';


export default function Profile() {

    const { user } = useAuth()
    console.log(user)
    console.log(user.photoURL)

    return (
        <div className="profile-container">
            <h1>Mi Perfil</h1>
            <div id="container__info">

                {user ?
                    <div>
                     {user.photoURL ? <img alt="imgProfile" src={user.photoURL} /> : <img alt="imgProfile" style={{width:'100px'}} src={userImg} />} 
                        <p>{user.displayName}</p>
                        <p>{user.email}</p>
                        <p>Formulario</p></div>
                    : <div></div>}

            </div>
        </div>
    )
}
