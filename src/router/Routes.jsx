import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "../Root";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import EditProduct from "../pages/EditProduct";

export const router = createBrowserRouter([    
    {path: "/", element: <Root />, children:[
        {path: "/", element: <Home/>},
        {path: "/register", element: <Register/>},
        {path: "/login", element: <Login/>},
        {path: "/product/:id", element: <ProductDetail/>},
        {path: "/admin/dashboard", element: <Dashboard />},
        {path: "/user/profile", element: <Profile />},
        {path: "/admin/dashboard/productmodify/:id", element: <EditProduct />},
        { path: "/disconnect", element: <Navigate to="/" /> }         
    ]},
])