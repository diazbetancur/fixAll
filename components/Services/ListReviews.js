import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import firebase from 'firebase/app'
import moment from 'moment/min/moment-with-locales'

moment.locale("es")

export default function ListReviews({ navigation, id }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            userInfo ? setUser(true) : setUser(false)
        })
    }, [])

    return (
        <View>
            {
                user ? (
                    <Button
                        buttonStyle={styles.btnAddReview}
                        title="Escribe una opinión"
                        titleStyle={styles.btnTitle}
                        onPress={() => navigation.navigate("add-review-service" , {id})}
                        icon={{
                            type:"material-community",
                            name:"square-edit-outline",
                            color:"#da5252"
                        }}
                    />   
                )
                : (
                    <Text style={styles.mustLoginText}
                        onPress={() => navigation.navigate("login")}
                    >
                        Para escribir una opnión es necesario estar logueado.{" "}
                        <Text style={styles.loginText}>
                            pulsa AQUi para iniciar sesión.
                        </Text>
                        </Text>
                )
        }
        </View>
    )
}

const styles = StyleSheet.create({
    btnAddReview:{
        backgroundColor:"transparent"
    },
    btnTitle:{
        color:"#f0cc20"
    },
    mustLoginText:{
        textAlign: "center",
        color:"#f0cc20",
        padding:20
    },
    loginText:{
        fontWeight: "bold"
    }
})
