import React from 'react';
import './App.css';
import Main from './Components/Main'
import Home from './Components/Home'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from "./Components/Navbar";
import Popup from "./Components/Popup";

function App() {

  const [popupLogin, setPopupLogin] = useState(false);
  const [popupSignin, setPopupSignin] = useState(false);
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const [userLogin, setUserLogin] = useState(() => {
    const initial = false;
    try {
      const data = localStorage.getItem("userLogin");
      return data ? JSON.parse(data) : initial;
    } catch (e) {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem("userLogin", JSON.stringify(userLogin));
  }, [userLogin]);

  const [newUsers, setNewUsers] = useState(() => {
    const initial = [];
    try {
      const data = localStorage.getItem("registeredUsers");
      return data ? JSON.parse(data) : initial;
    } catch (e) {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem("registeredUsers", JSON.stringify(newUsers));
  }, [newUsers]);

  function addNewUserLogin() {
    const newUserLogin = {
      email: loginValues.email,
      password: loginValues.password,
    };
    setUserLogin(newUserLogin);
  }

  const isLoggedIn = userLogin ? true : false;


  return (
    <div className="App">
      <BrowserRouter>
      <Navbar
          setPopupLogin={setPopupLogin}
          setPopupSignin={setPopupSignin}
          isLoggedIn={isLoggedIn}
          newUsers={newUsers}
          loginValues={loginValues}
          setLoginValues={setLoginValues}
          setUserLogin={setUserLogin}
          userLogin={userLogin}
        />
        <Popup
          triggerLogin={popupLogin}
          setTriggerLogin={setPopupLogin}
          triggerSignin={popupSignin}
          setTriggerSignin={setPopupSignin}
          isLoggedIn={isLoggedIn}
          setNewUsers={setNewUsers}
          newUsers={newUsers}
          loginValues={loginValues}
          setLoginValues={setLoginValues}
          addNewUserLogin={addNewUserLogin}
        />
       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/main" element={<Main/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;