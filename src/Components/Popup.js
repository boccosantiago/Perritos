import React, { useState } from "react";
import "../styles/Popup.css";
import validation from "./validation";
import { CgClose } from "react-icons/cg";
import { BsCheck2Circle } from "react-icons/bs";
import { RiCloseCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function Popup(props) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [register, setRegister] = useState(false);
  const [isLogged, setIsLogged] = useState(null);
  const [errors, setErrors] = useState({});

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
      setTimeout(() => defaultValues(), 1500);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function handleLogin(e) {
    e.preventDefault();
    const correct = props.newUsers.filter(
      (item) =>
        item.email === props.loginValues.email &&
        item.password === props.loginValues.password
    );
    if (correct.length !== 0) {
      setIsLogged(true);
      props.addNewUserLogin();
      setTimeout(() => defaultValues(), 1500);
    } else {
      setIsLogged(false);
    }
  }

  function handleChangeLogin(event) {
    const { name, value } = event.target;
    props.setLoginValues({
      ...props.loginValues,
      [name]: value,
    });
  }

  const navigate = useNavigate();

  function defaultValues() {
    setIsLogged(null);
    setRegister(false);
    props.setTriggerLogin(false);
    props.setTriggerSignin(false);
    navigate("/");
  }

  if (props.triggerLogin) {
    return (
      <div className="popup">
        <div className="popup-inner">
          <CgClose onClick={() => defaultValues()} className="btn-x" />
          <div className="inputs">
            <h2>Bienvenido!</h2>
            <form className="form">
              <div>
                <label>Email:</label>
                <br />
                <input
                  onChange={handleChangeLogin}
                  value={props.loginValues.email}
                  type="email"
                  name="email"
                  required
                />
              </div>
              <div>
                <label>Constraseña:</label>
                <br />
                <input
                  onChange={handleChangeLogin}
                  value={props.loginValues.password}
                  type="password"
                  name="password"
                  required
                />
              </div>
              <br />

              <button className="sub-btn" type="submit" onClick={handleLogin}>
                Login
              </button>
              {isLogged ? (
                <p className="success">
                  Bienvenido amigo perruno! <BsCheck2Circle />{" "}
                </p>
              ) : isLogged === false ? (
                <p className="fail">
                  No estas registrado! <RiCloseCircleLine />
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
  if (props.triggerSignin) {
    return (
      <div className="popup">
        <div className="popup-inner">
          <CgClose onClick={() => defaultValues()} className="btn-x" />
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
                {errors.firstName && (
                  <p className="error">{errors.firstName}</p>
                )}
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
              <button
                onClick={handleRegister}
                className="sub-btn"
                type="submit"
              >
                Crear Cuenta
              </button>
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
}

export default Popup;
