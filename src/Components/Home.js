import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";


function Home() {


  
  return (



<div className="hero min-h-screen" style={{ backgroundImage: `url("https://img.freepik.com/free-photo/adorable-brown-white-basenji-dog-smiling-giving-high-five-isolated-white_346278-1657.jpg?w=1380&t=st=1663837055~exp=1663837655~hmac=c96afbd8125b15c057ef24a41db013a30fe3b9814dfc3c9d32362948eb53cace")` }}>
<div className="hero-overlay bg-opacity-60"></div>
<div className="hero-content text-center text-neutral-content">
  <div className="max-w-sm mb-9">
    <h1 className="mb-9 text-5xl font-bold">Hola!</h1>
    <p className="mb-5">Todos los animales publicados en Perritos, provienen de entidades protectoras de animales (asociaciones protectoras, refugios, fundaciones, perreras, etc). Así tenemos la certeza que realmente necesitan un hogar. En Perritos no encontrarás animales que provengan de particulares. Recuerda que nuestro fin es salvar el mayor número de animales posible, y que encuentres un amigo para siempre.</p>
    <Link to="/main"> <button className="btn btn-primary">Empezar</button></Link>
  </div>
</div>
</div>
  );
}

export default Home;
