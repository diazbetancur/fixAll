import React ,  {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useEffect } from 'react'

export default function Account() {
    const [login, setLogin] = useState(initialState)

    useFocusEffect(
        useCallback(() => {
            const user = getCurrentUser()
            user ? setLogin(true) : setLogin(false)
        }, [])
    )

    if (login == null){
        return <Loading isVisible = {true} text ={login}/>
    }

    return login ? <UserLogged/> : <UserGuest/>


}

const styles = StyleSheet.create({})
