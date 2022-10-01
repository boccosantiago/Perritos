import React, { useState, useEffect, useContext } from "react";
import DogSearch from "../pages/DogSearch";
import Welcome from "../pages/Welcome";
import Profile from "../pages/Profile";
import AdoptionForm from "../pages/AdoptionForm";
import { Routes, Route, HashRouter } from "react-router-dom";
import Navbar from "../Components/Navbar";
import InfoDog from "../pages/InfoDog";
import Shelters from "../pages/Shelters";
import Login from "../pages/Login";
import Signup from "../pages/Register";
import Protected from "../router/Protected";
import Posts from "../pages/Posts";
import About from "../pages/About";
import Footer from "../Components/Footer";
import { ToastContainer } from "react-toastify";
import FavoriteList from "../Components/FavoriteList";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../context/auth";
import InitChat from "../Components/InitChat";
import Logged from "./Logged";

export default function AppRoutes(props) {
  const { user } = useContext(AuthContext);
  const [registeredName, setRegisteredName] = useState();

  async function getRegisteredName() {
    const auth = getAuth();
    if (auth.currentUser) {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRegisteredName(docSnap.data().name);
      } else {
        console.log("No existe el documento");
      }
    }
  }

  useEffect(() => getRegisteredName, [user]);

  return (
    <div className="App">
      <HashRouter>
        <Navbar
          setFavorites={props.setFavorites}
          registeredName={registeredName}
        />
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
          <Route element={<Logged />} >
          <Route path="/signup" element={<Signup />} />
          </Route>
          <Route path="/chat" element={<InitChat />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </HashRouter>
    </div>
  );
}
