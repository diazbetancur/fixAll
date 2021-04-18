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

export const addDocumentWithoutId= async(collection, data) => {
    const result = {statusResponse:true, error: null}

    try{
        await db.collection(collection).add(data)
    }
    catch (error)
    {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const getServices= async(limit) => {
    const result = {statusResponse:true, error: null, services: [], startservice: null}

    try{
        const response  = await db
        .collection("services")
        .orderBy("creatAt", "desc")
        .limit(limit)
        .get()
        if(response.docs.length > 0){
            result.startservice = response.docs[response.docs.length-1]
        }

        response.forEach((doc) => {
            const responseData = doc.data()
            responseData.id = doc.id
            result.service.push(responseData)
        })
    }
    catch (error)
    {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const getMoreServices= async(limit, startService) => {
    const result = {statusResponse:true, error: null, services: [], startService: null}

    try{
        const serivces = await db.collection("services")
        .orderBy("createAt", "desc")
        .startAfter(startService.data().createAt)
        .limit(limit)
        .get()
        if(services.docs.length > 0){
            result.startService = services.docs(services.docs.length-1)
        }
        services.forEach((doc) => {
            const responseData = doc.data()
            responseData.id = doc.id
            result.services.push(responseData)
        })
    }
    catch (error)
    {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const getDocumentById= async(collection, id) => {
    const result = {statusResponse:true, error: null, document: null}

    try{
        const response = await db.collection(collection).doc(id).get()
        result.document = response.data()
        result.document.id = response.id
    }
    catch (error)
    {
        result.statusResponse = false
        result.error = error
    }
    return result
}