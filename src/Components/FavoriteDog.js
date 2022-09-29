import React, { useContext } from "react";
import FavoriteContext from "../context/favoritesContext";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/auth";
import {success, deleted} from "../toast";

export default function FavoriteDog(props) {
  const { favoriteDogs, updateFavoriteDogs } = useContext(FavoriteContext);

  const { user } = useContext(AuthContext)

  const toastClick = () => {
    updateFavoriteDogs(props.petId);
    if (!favoriteDogs.includes(props.petId)) {
      success("🐶 Agregado a favoritos")
    } else {
      deleted("🐶 Eliminado de favoritos");
    }
  };

  return (
    <div>
      {user ? (
        <div className="heart" onClick={() => toastClick()}>
          {favoriteDogs.includes(props.petId) ? "🖤" : "🤍"}
        </div>
      ) : (
        <div className="heart"><Link to="/login">🤍</Link></div>
      )}
    </div>
  );
}
