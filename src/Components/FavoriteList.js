import { useContext } from "react";
import FavoriteContext from "../context/favoritesContext";

import { Link } from "react-router-dom";
//import { useAuth } from "../context/AuthContext";
import datos from "../datos";
import "../styles/FavoriteList.css";


export default function FavoriteList() {
  const { favoriteDogs } = useContext(FavoriteContext);

  const array = [];

  datos.map((item) => item.pets.map((dog) => array.push(dog)));

  let dogList = array.filter((item) => favoriteDogs.includes(item.id));
  console.log("doglist", dogList);

  const cargarImagen = require.context("../img", true);

  return (
    <div id="favorite-container">
      {dogList.map((pet) => (
        <div id="favorite-card" key={pet.id}>
          <Link className="favorite-cardlink" to={`/main/${pet.id}`}>
            <div id="favorite-img-container">
              <img
                id="favorite-img"
                alt=""
                src={cargarImagen(`./id${pet.id}.jpg`)}
              ></img>
            </div>
            <div>
            <span className="favorite-name">{pet.name}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

