import { isEmpty, size } from 'lodash'
import React , {useState}from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'

import { reauthenticate, updateEmail, updateProfile, updatePassword } from '../../utils/actions'


export default function ChangePasswordForm({email,setShowModal, toastRef, setReloadUser}) {
    const [newPassword, setNewPassword] = useState(email)
    const [currentPassword, setCurrentPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [errorNewPassword, setErrorNewPassword] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async() =>{
        if(!validateForm()){
            return
        }

        setLoading(true)
        const resultReauthenticate = await reauthenticate(currentPassword)
        if(!resultReauthenticate.statusResponse){
            setLoading(false)
            setErrorCurrentPassword("Contraseña incorrecta")
            return
        }

        const resultUpdatePassword = await updatePassword(newPassword)
        setLoading(false)

        if(!resultUpdatePassword.statusResponse){
            setErrorNewPassword("Hubo un problema cambiando contraseña, por favor intente mas tarde")
            return
        }

        
        toastRef.current.show("Se han actualizado la contraseña", 3000)
        setShowModal(false)
    }

    const validateForm = () =>{
        setErrorNewPassword(null)
        setErrorCurrentPassword(null)
        setErrorConfirmPassword(null)
        let isValid = true

        if(isEmpty(currentPassword)){
            setErrorCurrentPassword("Debes ingresar password actual")
            isValid = false
        }

        if(size(newPassword)<6){
            setErrorNewPassword("Debes ingresar una nueva contraseña d ealmenos 6 caracteres")
            isValid = false
        }

        if(size(confirmPassword)<6){
            setErrorConfirmPassword("Debes ingresar una nueva confirmacion de tu contraseña de almenos 6 cracteres")
            isValid = false
        }

        if(newPassword !== confirmPassword){
            setErrorNewPassword("la nueva contraseña y la confirmacion no son iguales")
            setErrorConfirmPassword("la nueva contraseña y la confirmacion no son iguales")
            isValid = false
        }
        console.log(newPassword,currentPassword)
        if(newPassword === currentPassword){
            setErrorNewPassword("Debes ingresar una contraseña diferente al actual")
            setErrorConfirmPassword("Debes ingresar una contraseña diferente al actual")
            setErrorCurrentPassword("Debes ingresar una contraseña diferente al actual")
            isValid = false
        }

        return isValid

    }

    return (
        <View style ={styles.view}>
            <Input
                placeholder= "Ingesa tu contraseña actual"
                containerStyle = {styles.input}
                defaultValue = {currentPassword}
                onChange = {(e) =>setCurrentPassword(e.nativeEvent.text)}
                errorMessage = {errorCurrentPassword}
                password ={true}
                secureTextEntry={!showPassword}
                rightIcon = {
                    <Icon
                        type = "material-community"
                        name = {showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle = {{color:"#f1cd21"}}
                        onPress={()=> setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder= "Ingesa tu contraseña tu nueva contraseña"
                containerStyle = {styles.input}
                defaultValue = {newPassword}
                onChange = {(e) =>setNewPassword(e.nativeEvent.text)}
                errorMessage = {errorNewPassword}
                password ={true}
                secureTextEntry={!showPassword}
                rightIcon = {
                    <Icon
                        type = "material-community"
                        name = {showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle = {{color:"#f1cd21"}}
                        onPress={()=> setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder= "Ingesa tu confirmacion de nueva contraseña"
                containerStyle = {styles.input}
                defaultValue = {confirmPassword}
                onChange = {(e) =>setConfirmPassword(e.nativeEvent.text)}
                errorMessage = {errorConfirmPassword}
                password ={true}
                secureTextEntry={!showPassword}
                rightIcon = {
                    <Icon
                        type = "material-community"
                        name = {showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle = {{color:"#f1cd21"}}
                        onPress={()=> setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title = "Cambia contraseña"
                containerStyle = {styles.btnContainer}
                buttonStyle = {styles.btn}
                onPress = {onSubmit}
                loading = {loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        alignItems: "center",
        paddingVertical: 10
    },
    input:{
        marginBottom: 10
    },
    btnContainer:{
       width: "95%" 
    },
    btn:{
        backgroundColor: "#f1cd21"
    }
})

