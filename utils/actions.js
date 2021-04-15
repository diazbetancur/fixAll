import {firebaseApp} from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'

const db = firebase.firestore(firebaseApp)

export const isUserLogged = () => {
    let isLogged = false
    firebase.auth().onAuthStateChanged((user)=>{
        user !== null && (isLogged = true)
    })
    return isLogged
}

export const getCurrentUser = () => {
    return firebase.auth().currentUser
}

export const closeSession = () => {
    return firebase.auth().signOut()
}

export const registerUser = async(email, pasword) => {
    const result = { statusResponse:true , error: null}

    try {
        await firebase.auth().createUserWithEmailAndPassword(email, pasword)
    } catch (error) {
        result.statusResponse = false
        result.error = "Este correo ya esta registrado"
    }

    return result
}

export const loginWithEmailAndPassword = async(email, pasword) => {
    const result = { statusResponse:true , error: null}

    try {
        await firebase.auth().signInWithEmailAndPassword(email, pasword)
    } catch (error) {
        result.statusResponse = false
        result.error = "Usuario o contraseña no validos"
    }

    return result
}