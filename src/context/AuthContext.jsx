import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getRole } from '../utils/peticiones';


// Crear un contexto para la autenticación
const AuthContext = createContext();

// Hook para acceder al contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para el usuario
  const [role, setRole] = useState("")
  
  useEffect(() => {
    // Suscribirse a los cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser); // Actualizamos el estado con el usuario autenticado (si existe)
      setRole(await getRole(currentUser.uid) )

    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role }}>
      {children} {/* Renderiza los componentes hijos */}
    </AuthContext.Provider>
  );
};
