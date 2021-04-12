import React from 'react'
import { Image } from 'react-native'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Button } from "react-native-elements"
import { useNavigation } from '@react-navigation/native'

import * as Animatable from 'react-native-animatable';

import Loading from '../../components/Loading'

export default function UserGuest() {
    const navigation = useNavigation()
    return (
        <ScrollView
            centerContent
            style ={styles.viewBody}
        >
            <Animatable.Text animation='lightSpeedIn' duration={2000} style = {styles.titleFixAll}>FixAll</Animatable.Text>
            
            <Animatable.Image
                animation= 'fadeInDown'
                duration = {2000}
                source = {require("../../assets/logop4_2.png")}
                resizeMode = "contain"
                style = {styles.image}
            />
            <Text style = {styles.description}>
                No estas logueado o registrasdo. Preciona el boton para continuar...
            </Text>
            <Button
                buttonStyle = {styles.button}
                title = "Continuar"
                onPress = {() => navigation.navigate("login")}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginHorizontal : 30
    },
    image: {
        height: 300,
        width: "100%",
        marginBottom: 10
        
    },
    description:{
        textAlign: "justify",
        marginBottom: 20,
        color: "#da5252",
        fontSize:20
    },
    button: {
        backgroundColor: "#cf2b2d",
        color: "#f0cc20"
    },
    titleFixAll: {
        fontWeight: "bold",
        fontSize: 30,
        marginVertical: 15,
        textAlign: "center",
        color: "#f0cc20"
    }
})
