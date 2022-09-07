import { FaHeart } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import React from "react";

function profile(){
    return (
    <div>
        <h1>Mi Perfil</h1>
        <div id="container__info">
        <img alt=""></img>
        <p>Nombre de usuario</p>
        <p>Email</p>
        <p>Formulario</p>
        </div>
        <div id="container__emoticonos">
            <FaHeart/>
            <button>Mis favoritos</button>
            <MdExitToApp/>
            <button>Salir</button>
        </div>
    </div>
    )
}
export default profile