import React, { useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { RiCloseCircleLine } from "react-icons/ri";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login (props) {
    console.log("loginprops", props)
    const [isLogged, setIsLogged] = useState(null);

    const navigate = useNavigate();

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
          setTimeout(() => navigate('../main'), 1500);
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
            <div className="login-container">
              <div className="login-inner">
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
                    <br/>
                    <br/>
                    <p>no estas registrado? <Link to='../signup'>Registrate!</Link></p>
                    {isLogged ? (
                      <p className="success">
                        Bienvenido amigo perruno! <BsCheck2Circle />
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