
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Protected = ({ children }) => {
    const { user } = useAuth()

    if (!user) {
        return <Navigate to="/login" replace />;
    } return children;

};
export default Protected;