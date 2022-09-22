import React, { useContext } from "react";
import FavoriteContext from "../context/favoritesContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

export default function FavoriteDog(props) {
  console.log(props)
  const { favoriteDogs, updateFavoriteDogs } = useContext(FavoriteContext);
  const { user } = useContext(AuthContext)
  console.log(favoriteDogs)

  const toastClick = () => {
    updateFavoriteDogs(props.petId);
    if (!favoriteDogs.includes(props.petId)) {
      console.log("añadido con exito")
    } else {
      console.log("eliminado con exito");
    }
  };
  return (
    <div>
      {user ? (
        <div className="heart" onClick={() => toastClick()}>
          {favoriteDogs.includes(props.petId) ? "🖤" : "🤍"}
        </div>
      ) : (
        <Link to="/login">🤍</Link>
      )}
    </div>
  );
}