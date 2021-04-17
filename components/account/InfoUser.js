import React, {useState} from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Avatar } from 'react-native-elements'
import { loadImageFromGalery } from '../../utils/helpers'
import {uploadImage , updateProfile} from '../../utils/actions'

export default function InfoUser({user , setLoading , setLoadingText}) {

    const [photoUrl, setPhotoUrl] = useState(user.photoURL)

    const changePhoto = async() =>{
        const result = await loadImageFromGalery([1,1])
        if(!result.status){
            return
        }
        setLoadingText("Actualizando imagen...")
        setLoading(true)
        const resultUploadImage = await uploadImage(result.image, "avatars", user.uid)
        console.log(resultUploadImage)
        if(!resultUploadImage.statusResponse){
            setLoading(false)
            Alert.alert("Ha ocurrido un error al almacenar la foto de perfil")
            return
        }

        const resultUpdateProfile = await updateProfile({photoURL: resultUploadImage.url})
        console.log(resultUpdateProfile)
        setLoading(true)
        if(resultUpdateProfile.statusResponse){
            setPhotoUrl(resultUploadImage.url)
            setLoading(false)
        }else{
            Alert.alert("Ha ocurrido un error al actualizar la fot de perfil.")
        }
        
    }

    
    return (
        <View style = {styles.container}>
            <Avatar
                onPress = {changePhoto}
                size = "large"
                
                source = {
                    photoUrl ? {uri : photoUrl} : require("../../assets/default-profile-pic.jpg")
                }
            />
            <View style ={styles.infoUser}>
                <Text style= {styles.displayName}>
                    {
                        user.displayName ? user.displayName : "Anonimo"
                    }
                </Text>
                <Text style= {styles.email}>
                    {
                        user.email
                    }
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        paddingVertical:40,
        marginTop: 10,
        marginHorizontal:5
    },
    infoUser:{
        marginHorizontal:40,
        position: "relative"
    },
    displayName: {
        fontWeight: "bold",
        paddingBottom: 10,
        fontSize: 22

    },
    email:{
        fontSize:17
    }
})
