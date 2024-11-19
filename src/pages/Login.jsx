import React from "react";
import './Login.css'

/* 
function login(e){
    e.preventDefault()
    const loginForm = new FormData(e.target)    
    const username = loginForm.get('username');
    alert(`Bienvenido ${username}`);
} */
/* function Login() {
    return (
        <>
       <div className="login-container">
            <form className="login-form" onSubmit={login}>
                <h1>Iniciar Sesión</h1>
                <div className="form-group">
                    <label htmlFor="username">Usuario:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
        </>
    )
}

export default Login; */

// src/components/Login.js
import { useState } from 'react';
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();  // Evita el comportamiento por defecto del formulario

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirigir o hacer algo después de un inicio de sesión exitoso
      alert('Inicio de sesión exitoso');
      // Puedes usar React Router para redirigir a la página principal
    } catch (error) {
      setError(error.message);  // Mostrar mensaje de error si ocurre algún problema
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar sesión</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;