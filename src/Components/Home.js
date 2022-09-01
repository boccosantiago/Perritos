import React from "react";
import { Link } from "react-router-dom";
function Home () {

return (
    <div>
        <img></img>
        <h2>BIENVENIDO</h2>
        <p>Descripción</p>
        <Link to='/main'><button>Empezar</button></Link>
    </div>
)
}

export default Home