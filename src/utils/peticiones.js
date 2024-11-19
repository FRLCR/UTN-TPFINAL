import { collection, doc, getDocs, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase"
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";


export const getProductList = async () => {
    try {
        const pcollection = collection(db, "products")
        const snapShot = await getDocs(pcollection)
        const productList = snapShot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        return productList
    } catch (error) {
        console.error(error)
    }
}

export const newUser = async (username, password, name, surname) => {

    createUserWithEmailAndPassword(auth, username, password)
        .then(async (userCredential) => {
            // Signed up 
            const user = userCredential.user;

            // Guardar datos en Realtime Database
            await setDoc(doc(db, 'users/' + user.uid), {
                name: name,
                email: user.email,
                surname: surname,
                userRole: "user",
                createdAt: new Date().toISOString(),
            });

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            // Manejo de errores específicos
            if (errorCode === 'auth/email-already-in-use') {
                console.log('Este correo electrónico ya está registrado.');
            } else if (errorCode === 'auth/invalid-email') {
                console.log('El correo electrónico no es válido.');
            } else if (errorCode === 'auth/weak-password') {
                console.log('La contraseña debe tener al menos 6 caracteres.');
            } else {
                console.log('Error: ' + errorMessage); // Mensaje de error genérico
            }
            console.error('Error de registro:', errorCode, errorMessage);
        });
}

export const getRole = async (userId) => {
    let role = "user"
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
        // Establecer el rol en el estado
        role = userDoc.data().userRole;
    }
    return role
}

export const newPoduct = async () => {

}

export const getProduct = async () => {

}

export const updateProduct = async () => {

}

export const deleteProduct = async () => {

}