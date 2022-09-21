import React, {useState, useEffect} from 'react';
import './App.css';
import Main from './Components/Main'
import Home from './Components/Home'
import Profile from './Components/Profile';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Dogs from './Components/Dogs';
import Map from './Components/Maps/Maps'
import { FavoriteProvider } from './context/favoritesContext';
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import Protected from "./Components/Protected";
import Posts from "./Components/Posts/Posts";
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/Chat';
// import MainChat from "./Components/MainChat2.js"

import FavoriteList from './Components/FavoriteList';


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
            <BrowserRouter>
              <Navbar setFavorites={setFavorites}/>
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
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* <Route path='/chat' element={<MainChat />} /> */}
              </Routes>
            </BrowserRouter>
          </div>
        </FavoriteProvider>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;