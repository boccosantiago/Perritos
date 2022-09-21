import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat"
// import NavbarChat from "./Components/Chat/NavbarChat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from './pages/Profile'
import AuthProvider from "./context/auth";
import { useState } from 'react';
import { FavoriteProvider } from './context/favoritesContext';
import Main from './Components/Main'
import Home from './Components/Home'
//import Profile from './Components/Profile';

import Navbar from "./Components/Navbar";
import Dogs from './Components/Dogs';
import Map from './Components/Maps/Maps'
import Protected from "./Components/Protected";
import Posts from "./Components/Posts/Posts";
import FavoriteList from './Components/FavoriteList';

function App() {
    const [favorites, setFavorites] = useState([])

    console.log('favorites', favorites)

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
            <FavoriteProvider value={{
                favoriteDogs: favorites,
                updateFavoriteDogs: updateFavoriteDogs
            }}
            >
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/main" element={<Main />} />
                        <Route path="/main/:id" element={
                            <Protected ><Dogs /></Protected>}
                        />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/favorites" element={<FavoriteList />} />
                        <Route path="/posts" element={<Posts />} />
                        <Route path="/maps" element={<Map />} />
                        <Route path="/signup" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        {/* <Route path="/profile" element={<Profile />} /> */}
                        <Route path="/chat" element={<Chat />} />
                    </Routes>
                </BrowserRouter>
            </FavoriteProvider>
        </AuthProvider>
    );
}

export default App;