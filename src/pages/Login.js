import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const navigate = useNavigate();

  const { email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setData({
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      navigate(-1);
    } catch (err) {
      setData({
        ...data,
        error: "Email o password incorrecto.",
        loading: false,
      });
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  return (
    <div style={{ height: "76vh" }} className="bg-stone-100 text-center">
      <form className="form form-user" onSubmit={handleSubmit}>
        <h3>Inicia sesión</h3>
        <div className="input_container text-left">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="input_container text-left">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        {error ? <p className="error">{error}</p> : null}
        <div className="btn_container">
          <button className="btn" disabled={loading}>
            {loading ? "Logging in ..." : "Login"}
          </button>
        </div>
      </form>
      <button
        onClick={handleGoogleSignin}
        className="bg-slate-50 hover:bg-slate-200 text-black  shadow rounded border-2 border-gray-300 py-2 px-4"
      >
        Google login
      </button>
      <p className=" text-sm text-center p-3">
        No tienes una cuenta?&nbsp;
        <Link to="/signup" className="text-neutral hover:text-neutral-focus">
          Registrate aquí
        </Link>
      </p>
    </div>
  );
};

export default Login;
