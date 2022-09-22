import React, { useContext } from "react";
import FavoriteContext from "../context/favoritesContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

export default function FavoriteDog(props) {

  const { favoriteDogs, updateFavoriteDogs } = useContext(FavoriteContext);
  const { user } = useContext(AuthContext)
  console.log(user)

  return (

    <div>
      {user ? (
        <div className="heart" onClick={() => updateFavoriteDogs(props.petId)}>
          {favoriteDogs.includes(props.petId) ? "❤️" : "🤍"}
        </div>) : <Link to="/login">🤍</Link>}

    </div>
  )
}

