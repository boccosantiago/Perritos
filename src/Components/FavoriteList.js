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
        <div className="card sm:card-side bg-base-100 shadow-xl m-7">
          <figure>
            <img
              style={{height:'180px', borderRadius:'20px'}}
              
              id="favorite-img"
              alt=""
              src={cargarImagen(`./id${pet.id}.jpg`)}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{pet.name}</h2>
            <p>Click the button to watch on Jetflix app.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Adoptame</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
