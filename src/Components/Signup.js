import React, { useState } from "react";
import validation from "./validation";
import { BsCheck2Circle } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Signup(props) {
  const [register, setRegister] = useState(false);

  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function addNewUser() {
    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };
    props.setNewUsers([...props.newUsers, user]);
  }

  function handleRegister(event) {
    setErrors(validation(values));
    const preventSubmit = validation(values);
    if (Object.entries(preventSubmit).length !== 0) {
      event.preventDefault();
      setRegister(false);
    } else {
      event.preventDefault();
      setRegister(true);
      addNewUser();
      //   setTimeout(() => defaultValues(), 1500);
    }
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }
  return (
    <div className="login-container">
      <div className="login-inner">
        {/* <CgClose onClick={() => defaultValues()} className="btn-x" /> */}
        <div className="inputs">
          <h2>Crea tu cuenta!</h2>
          <form className="form-register-container">
            <div>
              <label>Nombre:</label>
              <br />
              <input
                type="text"
                name="firstName"
                required
                onChange={handleChange}
                value={values.firstName}
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>
            <div>
              <label>Apellido:</label>
              <br />
              <input
                type="text"
                name="lastName"
                required
                onChange={handleChange}
                value={values.lastName}
              />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>
            <div>
              <label>Email:</label>
              <br />
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                value={values.email}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div>
              <label>Constraseña:</label>
              <br />
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
                value={values.password}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <br />
            <button onClick={handleRegister} className="sub-btn" type="submit">
              Crear Cuenta
            </button>
            <br />
            <br />
            <p>
            ¿Ya estas registrado? <Link to="../login">Entra aquí</Link>
            </p>
            {register ? (
              <p className="success">
                {" "}
                Cuenta creada satisfactoriamente! <BsCheck2Circle />{" "}
              </p>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
