
import { Navigate } from "react-router-dom";

const Protected = ({ isLoggedIn, children }) => {
    console.log("isLogged", isLoggedIn)
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    } return children;

};
export default Protected;