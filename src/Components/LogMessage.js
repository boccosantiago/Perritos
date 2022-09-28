import { Link } from "react-router-dom";

export default function LogMessage(props) {
  return (
    <div>
      <h2 className="text-neutral hover:text-neutral-focus">
        <Link to="/login">{props.text}</Link>
      </h2>
      No tienes una cuenta?{" "}
      <Link to="/signup" className="text-neutral hover:text-neutral-focus">
        Registrate aquí
      </Link>
    </div>
  );
}
