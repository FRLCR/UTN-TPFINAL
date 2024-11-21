import { collection, doc, getDocs, setDoc, getDoc, deleteDoc, addDoc, serverTimestamp, updateDoc } from "firebase/firestore";
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

            const user = userCredential.user;

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

            if (errorCode === 'auth/email-already-in-use') {
                console.log('Este correo electrónico ya está registrado.')
            } else if (errorCode === 'auth/invalid-email') {
                console.log('El correo electrónico no es válido.');
            } else if (errorCode === 'auth/weak-password') {
                console.log('La contraseña debe tener al menos 6 caracteres.')
            } else {
                console.log('Error: ' + errorMessage);
            }
            console.error('Error de registro:', errorCode, errorMessage)
        });
}

export const getRole = async (userId) => {
    let role = "user"
    const userDocRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userDocRef)

    if (userDoc.exists()) {
        role = userDoc.data().userRole
    }
    return role
}

export const newProduct = async (productData) => {
    try {

        const productsCollection = collection(db, 'products')

        await addDoc(productsCollection, {
            name: productData.name,
            price: productData.price,
            stock: productData.stock,
            desc: productData.desc,
            sku: productData.sku,
            createdAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error al agregar el producto: ', error)
    }
};


export const getProduct = async (productId) => {
    try {
        let productData = null

        const productDoc = doc(db, 'products', productId)
        const productSnapshot = await getDoc(productDoc)

        if (productSnapshot.exists()) {
            productData = {
                id: productSnapshot.id,
                ...productSnapshot.data(),
            };
        }

        return productData;
    } catch (error) {
        console.error('Error al obtener el producto: ', error)
        throw error;
    }
}

export const updateProduct = async (product) => {
    try {
        const productRef = doc(db, "products", product.id)
        await updateDoc(productRef, {
            name: product.name,
            price: product.price,
            stock: product.stock,
            desc: product.desc,
            sku: product.sku,
            createdAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error al actualizar el producto: ", error)
    }
}

export const deleteProduct = async (productId) => {
    try {

        const productDocRef = doc(db, 'products', productId)
        await deleteDoc(productDocRef);

    } catch (error) {
        console.error('Error al eliminar el producto:', error)
        throw error;
    }
}

export const getUserData = async (userId) => {
    try {

        let userData = null

        const userDocRef = doc(db, 'users', userId)
        const userSnapshot = await getDoc(userDocRef)

        if (userSnapshot.exists()) {
            userData = {
                id: userSnapshot.id,
                ...userSnapshot.data(),
            };
        }

        return userData;

    } catch (error) {
        console.error('Error al buscar usuario', error)
        throw error;
    }
}