import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'
import firebase from 'firebase/app'

import { getRestaurants } from '../../utils/actions'
import Loading from '../../components/Loading'
import { ScreenContainer } from 'react-native-screens'

export default function Services({ navigation }) {
    const [user, setUser] = useState(null)
    const [restaurants, setRestaurants] = useState([])
    const [startRestaurant, setStartRestaurant] = useState(null)
    const [loading, setLoading] = useState(false)

    if (user !== null) {
        return <Loading isVisible={true} text="Cargando... " />
    }

    return (
        <View style={styles.viewBody}>
            <Text style={styles.text}>¿Que tipo de Servicio esta Ofreciendo ?</Text>
            {
                user === null && (
                    <ScreenContainer style={styles.container}>
                        <Text style={styles.textService}>Servicio en Sitio</Text>
                        <Icon
                            type="material-community"
                            name="store-outline"
                            color="#da5252"
                            reverse
                            containerStyle={styles.btnContainerSite}
                            onPress={() => navigation.navigate("add-service")}
                        /></ScreenContainer>
                )
            }
            {
                user === null && (
                    <ScreenContainer style={styles.container}>
                        <Text style={styles.textService} >Servicio a Domicilio</Text>
                        <Icon
                            type="material-community"
                            name="moped"
                            color="#da5252"
                            reverse
                            containerStyle={styles.btnContainerDelivery}
                            onPress={() => navigation.navigate("add-service")}
                        /></ScreenContainer>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainerSite: {

        bottom: 0,
        shadowColor: "black",
        shadowOffset: { width: 34, height: 34 },
        shadowOpacity: 0.5,
    },
    btnContainerDelivery: {
        shadowColor: "black",
        shadowOffset: { width: 24, height: 24 },
        shadowOpacity: 0.5,
        margin: 10,
        flexDirection: "row"

    },
    viewBody: {
        flex: 1
    },
    text: {
        fontSize: 30,
        textAlign: "center",
        color: "#f0cc20"
    },
    textService: {
        fontSize: 25,
        textAlign: "center",
        color: "#f0cc20",
        margin: 5
    },
    container: {
        alignItems: "center",
        marginTop: "33%"
    }
})
