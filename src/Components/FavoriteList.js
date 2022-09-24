import { useContext, useState } from "react";
import FavoriteContext from "../context/favoritesContext";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";
//import { useAuth } from "../context/AuthContext";
import datos from "../datos";
import "../styles/FavoriteList.css";

export default function FavoriteList() {
  const { favoriteDogs, updateFavoriteDogs } = useContext(FavoriteContext);

  const array = [];

  datos.map((item) => item.pets.map((dog) => array.push(dog)));

  let dogList = array.filter((item) => favoriteDogs.includes(item.id));


  const deleted = () =>
    toast.error("🐶 Eliminado de favoritos", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const toastClick = (e) => {
    updateFavoriteDogs(e);
    if (favoriteDogs.includes(e)) {
      deleted();
    }
  };



  const cargarImagen = require.context("../img", true);

  return (
    <div className="favorite-container">
      {dogList.length !== 0 ? (
        <div>
          {dogList.map((pet, index) => (
            <div key={index} className="card sm:card-side bg-base-100 shadow-xl m-7">
              <figure>
                <img
                  style={{ height: "180px", borderRadius: "20px" }}
                  id="favorite-img"
                  alt=""
                  src={cargarImagen(`./id${pet.id}.jpg`)}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{pet.name}</h2>
                <p>Click the button to watch on Jetflix app.</p>
                <div className="card-actions justify-end block">
                  <button onClick={()=> toastClick(pet.id)} className="btn btn-circle float-right btn-outline">
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <button className="btn btn-primary">Adoptame</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-favorites">
          <span>Agrega tus perros favoritos para verlos en esta seccion</span>
        </div>
      )}
    </div>
  );
}
