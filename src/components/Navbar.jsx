import { NavLink } from "react-router-dom";
import './Navbar.css'

import { useAuth } from "../context/AuthContext";
import { signOut } from 'firebase/auth';
import { auth } from "../config/firebase";

function Navbar() {
    const { user, role } = useAuth();
    
    const isLogged = user != null
    const isAdmin = role === "admin"

    return (
        <header>
            <nav className="navbar">
                <div className="logo">UTN TP FINAL</div>
                <div className="nav-links">
                    <NavLink to="/" className={({ isActive }) => (isActive ? "active" : undefined)}>Home</NavLink>

                    {!isLogged ? <>
                        <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : undefined)}>Iniciar Sesión</NavLink>
                        <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : undefined)}>Registrarse</NavLink>
                    </> : null}

                    {isLogged && isAdmin ? <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? "active" : undefined)}>Dashboard</NavLink> : null}
                    
                    {isLogged ? <> <NavLink to="/user/profile" className={({ isActive }) => (isActive ? "active" : undefined)}>Perfil</NavLink>
                                   <NavLink to="/disconnect" className={({ isActive }) => (isActive ? "active" : undefined)} onClick={async () => await signOut(auth)}>Cerrar Sesión</NavLink>
                                </> : null}
                  

                </div>
            </nav>
        </header>
    )
}

export default Navbar;