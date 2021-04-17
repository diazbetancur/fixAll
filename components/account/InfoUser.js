import React, {useState} from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Avatar } from 'react-native-elements'

export default function InfoUser({user , setLoading , setLoadingText}) {

    const [photoUrl, setPhotoUrl] = useState(user.photoURL)

    
    return (
        <View style = {styles.container}>
            <Avatar
                
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
