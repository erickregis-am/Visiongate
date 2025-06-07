import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

export default function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Navigate to='/home'/>}></Route>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}