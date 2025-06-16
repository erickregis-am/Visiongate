import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import type { JSX } from "react";



interface ProtectedRouteType {
    children: JSX.Element;
}

export function ProtectedRoute({children} : ProtectedRouteType) {
    const { isAuthenticated, loading } = useAuth();


    if(loading) {
        return <p>
            Carregando...
        </p>
    }

    return (
        isAuthenticated ? children : <Navigate to="/login" replace/>
    );
}