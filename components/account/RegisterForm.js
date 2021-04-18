import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { size } from 'lodash'
import { useNavigation } from '@react-navigation/native'

import { validateEmail } from '../../utils/helpers'
import { registerUser } from '../../utils/actions'
import Loading from '../Loading'

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirm, setErrorConfirm] = useState("")
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const onChange = (e ,type) => {
        setFormData({...formData , [type]: e.nativeEvent.text})
        
    }

    const doRegisterUser = async() =>{
        if(!validateData()){
            return;
        }
        setLoading(true)
        const result = await registerUser(formData.email , formData.password)
        setLoading(false)

        if(!result.statusResponse){
            setErrorEmail(result.error)
            return
        }

        navigation.navigate("account")
    }

    const validateData = () =>{
        setErrorEmail("")
        setErrorPassword("")
        setErrorConfirm("")
        let isValid= true

        if(!validateEmail(formData.email)){
            setErrorEmail("Debes ingresar un email valido")
            isValid = false
        }

        if(size(formData.password) < 6 ){
            setErrorPassword("Debes ingresar una contraseña de almenos 6 carcteres.")
            isValid = false
        }

        if(size(formData.confirm) < 6 ){
            setErrorConfirm("Debes ingresar una confirmacion de contraseña de al menos 6 caracteres.")
            isValid = false
        }

        if( formData.password !== formData.confirm){
            setErrorConfirm("la contraseña y la confirmacion no son iguales")
            setErrorPassword("la contraseña y la confirmacion no son iguales")
            isValid = false
        }

        return isValid
    }



    return (
        <View style = {styles.form}>
            <Input
                containerStyle = {styles.input}
                placeholder = "ingresa tu email..."
                onChange = {(e) => onChange(e, "email")}
                keyboardType = "email-address"
                errorMessage = {errorEmail}
                defaultValue = {formData.email}
            />
            <Input
                containerStyle = {styles.input}
                placeholder = "Ingresa tu contraseña..."
                password = {true}
                secureTextEntry={!showPassword}
                onChange = {(e) => onChange(e, "password")}
                rightIcon = {
                    <Icon
                        type= "material-community"
                        name = {showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle = {styles.icon}
                        onPress = {()=> setShowPassword(!showPassword)}
                    />
                }
                errorMessage = {errorPassword}
                defaultValue = {formData.password}
            />
            <Input
                containerStyle = {styles.input}
                placeholder = "Confirma tu contraseña..."
                password = {true}
                secureTextEntry={!showPassword}
                onChange = {(e) => onChange(e, "confirm")}
                rightIcon = {
                    <Icon
                        type= "material-community"
                        name = {showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle = {styles.icon}
                        onPress = {()=> setShowPassword(!showPassword)}
                    />
                }
                errorMessage = {errorConfirm}
                defaultValue = {formData.confirm}
            />
            <Button
                title = "Registrar Nuevo Usuario"
                containerStyle = {styles.btncontainer}
                buttonStyle = {styles.btn}
                onPress = {() => doRegisterUser()}
            />
            <Loading
                isVisible = {loading}
                text = "Cargando cuenta..."
            />
        </View>
    )
}

const defaultFormValues = () =>{
    return { 
        email : "" ,
        password : "" ,
        confirm : ""
    }
}

const styles = StyleSheet.create({
    form: {
        marginTop: 30
    },
    input: {
        width: "100%"
    },
    btncontainer: {
        marginTop: 20,
        width: "85%",
        alignSelf: "center"
    },
    btn: {
        backgroundColor: "#f0cc20"
    },
    icon:{
        color: "#c1c1c1"
    }
})