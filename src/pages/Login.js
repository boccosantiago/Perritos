import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const Login = ({ setRegisteredName }) => {
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
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // await updateDoc(doc(db, "users", result.user.uid), {
      //     isOnline: true,
      // });

      setData({
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      navigate("/");
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      // props.setUserLogin(true)
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
        <div style={{height:'76vh'}}  className='bg-stone-100 text-center'>
           
            <form className="form-user" onSubmit={handleSubmit}> 
            <h3>Entra en tu cuenta</h3>
                <div className="input_container text-left">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div className="input_container">
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
