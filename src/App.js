import React from "react";
import "./App.css";
import Main from "./Components/Main";
import Home from "./Components/Home";
import Profile from "./pages/Profile";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Dogs from "./Components/Dogs";
// import Shelters from "./Components/Maps/Shelters";
import { FavoriteProvider } from "./context/favoritesContext";
import Login from "./pages/Login";
import Signup from "./pages/Register";
import Protected from "./Components/Protected";
import Posts from "./Components/Posts/Posts";
import AuthProvider from "./context/auth";
// import { ChatProvider } from "./context/Chat";
import MainChat from "./pages/Chat";
import "./index.css";
import Footer from "./Components/Footer";
import { ToastContainer } from "react-toastify";
import FavoriteList from "./Components/FavoriteList";
import { useNavigate } from "react-router-dom";

//login

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";

//getData
import { doc, getDoc } from "firebase/firestore";

function App() {

  //Login 
  const [registeredName, setRegisteredName] = useState()


  //Favoritos
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

  console.log("favorites", favorites);

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
    <AuthProvider>
      {/* <ChatProvider> */}
      <FavoriteProvider
        value={{
          favoriteDogs: favorites,
          updateFavoriteDogs: updateFavoriteDogs,
        }}
      >
        <div className="App">
          <BrowserRouter>
            <Navbar setFavorites={setFavorites} registeredName={registeredName} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/main" element={<Main />} />
              <Route
                path="/main/:id"
                element={
                  <Protected>
                    <Dogs />
                  </Protected>
                }
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/favorites" element={<FavoriteList />} />
              <Route path="/posts" element={<Posts registeredName={registeredName} />} />
              {/* <Route path="/shelters" element={<Shelters />} /> */}
              <Route path="/login" element={<Login setRegisteredName={setRegisteredName} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/chat" element={
                <Protected>
                  <MainChat />
                </Protected>} />
            </Routes>
            <Footer />
            <ToastContainer
              position="top-center"
              autoClose={500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </BrowserRouter>
        </div>
      </FavoriteProvider>
      {/* </ChatProvider> */}
    </AuthProvider>
  );
}

export default App;
