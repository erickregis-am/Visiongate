import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
 
export function RootRedirection() {
    const { isAuthenticated, loading } = useAuth();


    if(loading) {
        return <p>
            Carregando...
        </p>
    }

    return (
        isAuthenticated ? <Navigate to="/home" replace/> : <Navigate to="/login" replace/>
    );
}