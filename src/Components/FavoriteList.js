import { useContext} from "react";
import FavoriteContext from "../context/favoritesContext";
import { Link } from "react-router-dom";
import datos from "../datos";
import "../styles/FavoriteList.css";
import {deleted} from "../toast";

export default function FavoriteList() {

  const { favoriteDogs, updateFavoriteDogs } = useContext(FavoriteContext);

  const array = [];
  datos.map((item) => item.pets.map((dog) => array.push(dog)));
  const dogList = array.filter((item) => favoriteDogs.includes(item.id));

  const toastClick = (e) => {
    updateFavoriteDogs(e);
    if (favoriteDogs.includes(e)) {
       deleted("🐶 Eliminado de favoritos");
    }
  };

  const loadImage = require.context("../Assets/img", true);

  return (
    <div className="favorite-container bg-stone-100">
      {dogList.length !== 0 ? (
        <div>
          {dogList.map((pet, index) => (
            
            <div key={index} className="card my-10 card-side bg-base-100 shadow-xl m-auto md:w-2/4">
              <Link to={`../main/${pet.id}`}>
                <figure>
                <img
                  style={{ height: "180px", borderRadius: "20px" }}
                  id="favorite-img"
                  alt=""
                  src={loadImage(`./id${pet.id}.jpg`)}
                />
              </figure>
              </Link >
              <div className="card-body">
                <Link to={`../main/${pet.id}`}>
                <h2 className="card-title">{pet.name}</h2>
                </Link>
                <p></p>
                <div className="card-actions justify-end block">
                  <button onClick={()=> toastClick(pet.id)} className="btn btn-circle absolute right-2 top-2 btn-outline">
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
                  <Link to={`/main/${pet.id}/formulario`} className="btn btn-primary">Adóptame</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-favorites">
          <span>Agrega tus perros favoritos para verlos en esta sección.</span>
        </div>
      )}
    </div>
  );
}
