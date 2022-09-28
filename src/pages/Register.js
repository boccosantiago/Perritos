import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import Validation from "../Components/Validation";
const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    loading: false,
  });

  const navigate = useNavigate();

  const { name, email, password, loading } = data;

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setErrors(Validation(data));

    const validate = Validation(data);
    if (Object.entries(validate).length !== 0) {
      e.preventDefault();
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
      });
      setData({
        name: "",
        email: "",
        password: "",
        loading: false,
      });
      navigate("/");
    } catch (err) {
      setData({ ...data, loading: false });
    }
  };

  return (
    <div style={{ height: "76vh" }} className=" bg-stone-100 h-76">
      <div className="">
        <form className="form-user" onSubmit={handleSubmit}>
          <h3>Crea tu cuenta</h3>
          <div className="input_container">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
            {errors.name ? <p className="error">{errors.name}</p> : <p></p>}
          </div>
          <div className="input_container">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
            />
            {errors.email ? <p className="error">{errors.email}</p> : <p></p>}
          </div>
          <div className="input_container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            {errors.password ? (
              <p className="error">{errors.password}</p>
            ) : (
              <p></p>
            )}
          </div>

          <div className="btn_container">
            <button className="btn" disabled={loading}>
              {loading ? "Creando cuenta.." : "Regístrate"}
            </button>
          </div>
        </form>
      </div>
      <p className="text-sm text-center p-3">
        Tienes una cuenta?&nbsp;
        <Link to="/login" className="text-neutral hover:text-neutral-focus">
          Entra aquí
        </Link>
      </p>
    </div>
  );
};

export default Register;
