import React, {useState, useEffect} from 'react';
import './App.css';
import { FavoriteProvider } from './context/favoritesContext';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/Chat';

import AppRoutes from './router/Routes';


function App() {

  const [favorites, setFavorites] = useState(
    () => {
        const initial = [];

        try {
            const data = localStorage.getItem("favorites");
            return data ? JSON.parse(data) : initial
        } catch (e) {
            return initial
        }

    });


useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites])


   const updateFavoriteDogs = (name) => {
    const updated = [...favorites];
    const isFavorite = favorites.indexOf(name);
    if (isFavorite >= 0) {
      updated.splice(isFavorite, 1)
    } else {
      updated.push(name);
    }
    setFavorites(updated);
  }

  return (
    <AuthProvider>
      <ChatProvider>
        <FavoriteProvider value={{
          favoriteDogs: favorites,
          updateFavoriteDogs: updateFavoriteDogs
        }}
        >
          <div className="App">
            <AppRoutes setFavorites={setFavorites}/>
          </div>
        </FavoriteProvider>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;