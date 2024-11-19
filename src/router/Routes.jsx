import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";

export const router = createBrowserRouter([
    {path: "/", element: <Root />, children:[
        {path: "/", element: <Home/>},
        {path: "/register", element: <Register/>},
        {path: "/login", element: <Login/>},
        {path: "/product/:id", element: <ProductDetail/>},
    ]},
])