import React from "react";
import { useParams } from "react-router-dom";
import data from "../datos";
import { Link } from "react-router-dom";
import "../styles/Dogs.css";
import { IoLocationSharp } from "react-icons/io5";
import FavoriteDog from "./FavoriteDog";


function Dogs() {
  const loadImage = require.context("../img", true);
  const params = useParams();
  const infoProtect = data.map((item) => item.pets);

  const arrayPets = [];
  infoProtect.map((item) => item.map((y) => arrayPets.push(y)));
  const result = arrayPets.filter((item) => item.id === Number(params.id));
  const dogData = result[0];

  const indexProtectora = infoProtect.findIndex(item => item.findIndex(pet => pet.id === Number(params.id)) > -1);
  //console.log("infoprotectora", indexProtectora)

  return (

    <div className="container-dog">
      <div className="dog-card">
        <h1>{dogData.name}</h1>
        <FavoriteDog petId={dogData.id} />
        <img
          className="img-dog-card"
          alt=""
          src={loadImage(`./id${params.id}.jpg`)}
        ></img>
        {infoProtect.name}
        <div className="dog-data">
          <h3 className="location"><IoLocationSharp />{data[indexProtectora].city}</h3>
          <br />
          <h3>Detalles: <Link to={"/main"} className='adoptame'> Adoptame </Link></h3>
          <br />
         
        </div>
        <br />
        <h3>Descripcion: </h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      <div className="links-dog">
        <Link to={"/main"} className='regresar'> Regresar </Link>
      </div>
    </div>

  );
}


export default Dogs;
