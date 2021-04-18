import React ,{useEffect, useState}from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import firebase from  'firebase/app'

import Loading from "../../components/Loading"

export default function MyServices({navigation}) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            userInfo ? setUser(true) : setUser(false)
        })
    }, [])
    
    if(user === null){
        return <Loading isVisible={true} text="Cargando"/>

    }

    return (
        <View style = {styles.viewBody}>
            <Text>SERVICES...</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex:1
    }
})
