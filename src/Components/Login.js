import React, { useState } from "react";
import "../styles/Popup.css";
import validation from "./validation";
import { CgClose } from "react-icons/cg";
import { BsCheck2Circle } from "react-icons/bs";
import { RiCloseCircleLine } from "react-icons/ri";

export default function Login (props) {
    console.log("loginprops", props)
    const [isLogged, setIsLogged] = useState(null);

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
        //   setTimeout(() => defaultValues(), 1500);
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
   
        return (
            <div className="popup">
              <div className="popup-inner">
                {/* <CgClose onClick={() => defaultValues()} className="btn-x" /> */}
                <div className="inputs">
                  <h2>Bienvenido!</h2>
                  <form className="form">
                    <div>
                      <label>Email:</label>
                      <br />
                      <input
                        onChange={(e) => handleChangeLogin(e)}
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