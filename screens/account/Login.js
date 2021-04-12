import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native'

export default function Login() {
    return (
        <ScrollView>
            <Animatable.Image
                animation= 'fadeInDown'
                duration = {4000}
                source = {require("../../assets/logop4_2.png")}
                resizeMode = "contain"
                style = {styles.image}
            />
            <Divider style = {styles.divider}/>
            <Animatable.View  animation= "fadeInDownBig" duration={4000} style = {styles.container}>
                
                <Text>loginform</Text>
                <CreateAccount/>
            </Animatable.View>
            
        </ScrollView>
    )
}

function CreateAccount(prop){
    const navigation = useNavigation()
    return(
        <Button 
            style = {styles.registerButton}
            title = "Crear Cuenta"
            onPress = {() => navigation.navigate("register")}
        >
        </Button>
    )
        
    
}

const styles = StyleSheet.create({
    image: {
        height:150,
        width: "100%",
        marginBottom: 20
    },
    container: {
        marginHorizontal : 40
    },
    divider: {
        backgroundColor :  "#cf2b2d",
        margin: 30
    },
    registerButton: {
        backgroundColor: "#cf2b2d"
    }
})
