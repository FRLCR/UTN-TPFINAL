import React from "react";
import './Login.css'
import { useState } from 'react';
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleLogin = async (e) => {

    e.preventDefault(); 
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message); 
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