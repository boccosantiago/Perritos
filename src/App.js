import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import DogSearch from "./pages/DogSearch";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import AdoptionForm from "./pages/AdoptionForm";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
import InfoDog from "./pages/InfoDog";
import Shelters from "./Components/Maps/Shelters";
import { FavoriteProvider } from "./context/favoritesContext";
import Login from "./pages/Login";
import Signup from "./pages/Register";
import Protected from "./Components/Protected";
import Posts from "./Components/Posts/Posts";
import About from "./pages/About";

// import { ChatProvider } from "./context/Chat";
import MainChat from "./pages/Chat";
import "./index.css";
import Footer from "./Components/Footer";
import { ToastContainer } from "react-toastify";
import FavoriteList from "./Components/FavoriteList";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
//login

import { signInWithEmailAndPassword } from "firebase/auth";
import { db } from "./firebase";

//getData
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "./context/auth";
function App() {
  const { user } = useContext(AuthContext);

  //Login
  const [registeredName, setRegisteredName] = useState();

  async function getRegisteredName() {
    const auth = getAuth();
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setRegisteredName(docSnap.data().name);
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  console.log(registeredName);

  useEffect(() => getRegisteredName, [user]);

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
            <Route path="/" element={<Welcome />} />
            <Route path="/main" element={<DogSearch />} />
            <Route
              path="/main/:id"
              element={
                <Protected>
                  <InfoDog />
                </Protected>
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/main/:id/formulario" element={<AdoptionForm />} />
            <Route path="/favorites" element={<FavoriteList />} />
            <Route
              path="/posts"
              element={<Posts registeredName={registeredName} />}
            />
            <Route path="/shelters" element={<Shelters />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/chat"
              element={
                <Protected>
                  <MainChat />
                </Protected>
              }
            />
            <Route path="/about" element={<About />} />
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
  );
}

export default App;
