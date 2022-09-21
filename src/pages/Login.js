import React, { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        error: null,
        loading: false,
    });

    const navigate = useNavigate();

    const { name, email, password, error, loading } = data;

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
            //const result = await signInWithEmailAndPassword(auth, email, password);

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


    // const handleGoogleSignin = async () => {
    //     try {
    //         await loginWithGoogle();
    //         // props.setUserLogin(true)
    //         navigate("/");
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };

    // const loginWithGoogle = () => {
    //     const googleProvider = new GoogleAuthProvider();
    //     return signInWithPopup(auth, googleProvider);
    // };

    return (
        <section>
            <h3>Log into your Account</h3>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input_container">
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
            {/* <button
                onClick={handleGoogleSignin}
                className="bg-slate-50 hover:bg-slate-200 text-black  shadow rounded border-2 border-gray-300 py-2 px-4 w-full"
            >
                Google login
            </button> */}
            <p className="my-4 text-sm flex justify-between px-3">
                Don't have an account?
                <Link to="/signup" className="text-blue-700 hover:text-blue-900">
                    Register
                </Link>
            </p>
        </section>
    );
};

export default Login;