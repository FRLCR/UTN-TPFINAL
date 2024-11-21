import './Profile.css'
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { getUserData } from '../utils/peticiones';

function Profile() {
    const { user, role } = useAuth();
    const [userData, setUserData] = useState(null)

    const LOADING =  "Cargando..."

    const fetchUser = async () => {
        if (user) {  
            const data = await getUserData(user.uid);
            setUserData(data); 
        }
    };

    useEffect(() => {
        if (user) {
            fetchUser();
        }
    }, [user]); 

    if (!user) {
        return <h1>No puedes ver tu perfil si no estás logueado</h1>
    }
    return (
        <div className="profile-page">
            {userData ? (
                <>
                    <h1>Bienvenido {userData.name}!</h1>
                    <h5>
                        Todavía estamos trabajando para que puedas editar tu perfil. Si crees que ha surgido un error o deseas modificar tus datos, por favor contacta al administrador del sitio.
                    </h5>

                    <h1>Tus Datos</h1>

                    <div>
                        <label htmlFor="">Nombre: {userData.name}</label>
                        <label htmlFor="">Apellido: {userData.surname}</label>
                        <label htmlFor="">Email: {userData.email}</label>
                    </div>
                </>
            ) : (
                <h1>{LOADING}</h1>
            )}
        </div>
    );
}

export default Profile