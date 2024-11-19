import React from "react";
import './Register.css'
import { newUser } from "../utils/peticiones";


function register(e) {
    e.preventDefault()
    const registerForm = new FormData(e.target)
    const username = registerForm.get('username');
    const password = registerForm.get('password')
    const name = registerForm.get('name')
    const surname = registerForm.get('surname')
    
    newUser(username, password, name, surname)
}
function Register() {
    return (
        <>
            <div className="register-container">
                <form className="register-form" onSubmit={(register)}>
                    <h1>Registrarse</h1>
                    <div className="form-group">
                        <label htmlFor="username">Email:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" name="password" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" id="name" name="name" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="surname">Apellido:</label>
                        <input type="text" id="surname" name="surname" required />
                    </div>
                    <button className="registerButton" type="submit">Registrarse</button>
                </form>
            </div>
        </>
    )
}

export default Register;