
import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/auth";

const Protected = ({ children }) => {
    //const { user } = useAuth()
    const { user } = useContext(AuthContext)

    if (!user) {
        return <Navigate to="/login" replace />;
    } return children;

};
export default Protected;