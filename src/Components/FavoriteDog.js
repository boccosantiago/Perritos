import React, { useContext } from "react";
import FavoriteContext from "../context/favoritesContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Alert } from "./Alert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FavoriteDog(props) {
  const { favoriteDogs, updateFavoriteDogs } = useContext(FavoriteContext);
  const { user } = useAuth();

  const success = () =>
    toast.success("🐶 Agregado a favoritos", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

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

  const toastClick = () => {
    updateFavoriteDogs(props.petId);
    if (!favoriteDogs.includes(props.petId)) {
      success();
    } else {
      deleted();
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
