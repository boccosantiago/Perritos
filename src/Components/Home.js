import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";


function Home() {


  
  return (
    <div>
      <div className="container">
        <div className="main">
          <h2>BIENVENIDO</h2>
          <p className="home-text">Todos los animales publicados en Perritos, provienen de entidades protectoras de animales (asociaciones protectoras, refugios, fundaciones, perreras, etc). Así tenemos la certeza que realmente necesitan un hogar. En Perritos no encontrarás animales que provengan de particulares. Recuerda que nuestro fin es salvar el mayor número de animales posible, y que encuentres un amigo para siempre.</p>
          <Link to="/main">
            <button className="empezar">Empezar</button>
          </Link>
        </div>
      </div>
      </div>
  );
}

export default Home;
