import React, { useState, useEffect } from 'react';
import './App.css';
import { FavoriteProvider } from './context/favoritesContext';
import AuthProvider from './context/auth';


import AppRoutes from './router/AppRoutes';

export default function App() {


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
    }, [favorites]);


    const updateFavoriteDogs = (name) => {
        const updated = [...favorites];
        const isFavorite = favorites.indexOf(name);
        if (isFavorite >= 0) {
            updated.splice(isFavorite, 1)
        } else {
            updated.push(name);
        }
    }


    return (
        <AuthProvider>
            <FavoriteProvider value={{
                favoriteDogs: favorites,
                updateFavoriteDogs: updateFavoriteDogs
            }}
            >
                <div className="App">
                    <AppRoutes setFavorites={setFavorites} />
                </div>
            </FavoriteProvider>
        </AuthProvider>
    );
}
