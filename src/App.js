import React, { useState, useEffect} from "react";
import "./App.css";
import "./index.css";
import { FavoriteProvider } from "./context/favoritesContext";
import AppRoutes from "./router/AppRoutes"

function App() {
  
  const [favorites, setFavorites] = useState(() => {
    const initial = [];

    try {
      const data = localStorage.getItem("favorites");
      return data ? JSON.parse(data) : initial;
    } catch (e) {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  
  const updateFavoriteDogs = (name) => {
    const updated = [...favorites];
    const isFavorite = favorites.indexOf(name);
    if (isFavorite >= 0) {
      updated.splice(isFavorite, 1);
    } else {
      updated.push(name);
    }
    setFavorites(updated);
  };

  return (
    <FavoriteProvider
      value={{
        favoriteDogs: favorites,
        updateFavoriteDogs: updateFavoriteDogs,
      }}
    >
     <AppRoutes setFavorites={setFavorites}/>
    </FavoriteProvider>
  );
}

export default App;
