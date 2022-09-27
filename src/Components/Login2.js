import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Alert } from "./Alert";
import "../styles/Login.css";

export default function Login(props) {



  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const [user, setUser] = useState({
    email: "",
    password: "",
  });


  const handleChangeLogin = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  console.log('userLogin', user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      // props.setUserLogin(true)
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };



  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      // props.setUserLogin(true)
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };



  // const handleResetPassword = async (e) => {
  //   e.preventDefault();
  //   if (!props.user.email) return setError("Write an email to reset password");
  //   try {
  //     await resetPassword(props.user.email);
  //     setError('We sent you an email. Check your inbox')
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };


  return (
    <div className="login-container bg-stone-100">
      <div className="login-inner">
        {error && <Alert message={error} />}

        <form
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="email"

            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChangeLogin}

              placeholder="youremail@company.tld"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"

            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChangeLogin}
              placeholder="*************"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            {/* <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#!"
              onClick={handleResetPassword}
            >
              Forgot Password?
            </a> */}
          </div>
        </form>
        <button
          onClick={handleGoogleSignin}
          className="bg-slate-50 hover:bg-slate-200 text-black  shadow rounded border-2 border-gray-300 py-2 px-4 w-full"
        >
          Google login
        </button>
        <p className="my-4 text-sm flex justify-between px-3">
          Don't have an account?
          <Link to="/signup" className="text-blue-700 hover:text-blue-900">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}