import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import { RootRedirection } from "./RootRedirection";
import Funcionarios from "../pages/Funcionarios";
import Historico from "../pages/Historico";
import { EmployeeProvider } from "../contexts/EmployeeContext";




export default function AppRoutes(){
    return (
        <BrowserRouter>
            <AuthProvider>
                <EmployeeProvider>
                    <Routes>
                        <Route path="/" element={<RootRedirection />} />
                        <Route path="/home" element={
                            <ProtectedRoute>
                                <Home/>
                            </ProtectedRoute>
                        }></Route>
                        <Route path="/home/funcionarios" element={
                            <ProtectedRoute>
                                <Funcionarios/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/home/historico" element={
                            <ProtectedRoute>
                                <Historico/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/login" element={<Login/>}></Route>
                        <Route path="/register" element={<Register/>}></Route>
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                </EmployeeProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}