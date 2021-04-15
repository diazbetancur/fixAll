import React , {useState, useRef , useEffect}from 'react'
import { Button } from 'react-native-elements'
import { View, Text ,StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import { closeSession } from '../../utils/actions'


export default function UserLogged() {
    return (
        <View>
            <Text>UserLogged</Text>
            <Text>Options</Text>
            <Button
                title ="Cerrar sesion"
                containerStyle = {styles.btnContainer}
                buttonStyle = {styles.closeSesionButton}
                onPress = {() => {
                    closeSession()
                    navigation.navigate("search")
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer:{
        marginTop: 20,
        width: "85%",
        alignSelf: "center"
    },
    closeSesionButton:{
        backgroundColor:"#cf2b2d"
    }
})
