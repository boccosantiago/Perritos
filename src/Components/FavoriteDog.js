import React, { useContext } from "react";
import FavoriteContext from "../context/favoritesContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function FavoriteDog(props) {

  const { favoriteDogs, updateFavoriteDogs } = useContext(FavoriteContext);
  const { user } = useAuth()

  return (

    <div>
      {user ? (
        <div onClick={() => updateFavoriteDogs(props.petId)}>
          {favoriteDogs.includes(props.petId) ? "❤️" : "🤍"}
        </div>) : <Link to="/login">🤍</Link>}

    </div>
  )
}

