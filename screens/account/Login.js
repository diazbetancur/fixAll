import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Divider , Button} from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import LoginForm from '../../components/account/LoginForm'

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
            <Animatable.Text animation='lightSpeedIn' duration={4000} style = {styles.titleFixAll}>FixAll</Animatable.Text>
            <Divider style = {styles.divider}/>
            <Animatable.View  animation= "lightSpeedIn" duration={4000} style = {styles.container}>
                
                <LoginForm/>
                
                <CreateAccount/>
            </Animatable.View>
            
        </ScrollView>
    )
}

function CreateAccount(prop){
    const navigation = useNavigation()
    return(
        <Button 
            containerStyle = {styles.btnContainer}
            buttonStyle = {styles.registerButton}
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
    },
    btnContainer: {
        marginTop: 20 ,
        width: "95%",
        alignSelf: "center"
    },
    titleFixAll: {
        fontWeight: "bold",
        fontSize: 30,
        marginVertical: 15,
        textAlign: "center",
        color: "#f0cc20"
    }
})
