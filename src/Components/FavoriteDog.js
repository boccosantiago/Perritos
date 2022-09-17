import React, {useContext} from "react";
import FavoriteContext from "../context/favoritesContext";
import { Link } from "react-router-dom";
import datos from "../datos";
export default function FavoriteDog(props){
  console.log(props)
  const { favoriteDogs, updateFavoriteDogs } = useContext(FavoriteContext);
  console.log('FAVS', favoriteDogs)
//   const infoProtect = datos.map((item) => item.pets);
//   const pets = infoProtect.map(pet => pet.name)
//   console.log(pets)

    return(
       
        <div>
        {/* {props.isLoggedIn ? (
                <div className="heart" onClick={() => updateFavoriteDogs(props.petName)}>
               {favoriteDogs.includes(props.petName) ? "❤️" : "🤍"}
              </div>): <Link className="heart" to="./login">🤍</Link>}
         */}
         {props.isLoggedIn ? (
                <div onClick={() => updateFavoriteDogs(props.petName)}>
               {favoriteDogs.includes(props.petName) ? "❤️" : "🤍Hola"}
              </div>): <Link to="./login">🤍</Link>}

        </div>
    )
}