import React, { useState, useEffect, useCallback } from 'react'
import {useFocusEffect} from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { size } from 'lodash'
import firebase from 'firebase/app'

import ListServices from '../../components/Services/ListServices'
import { getMoreServices, getServices } from '../../utils/actions'
import Loading from '../../components/Loading'

export default function StartServices({ navigation }) {
    const [user, setUser] = useState(null)
    const [services, setServices] = useState([])
    const [startService, setStartService] = useState(null)
    const [loading, setLoading] = useState(false)

    const limit = 7

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            userInfo ? setUser(true) : setUser(false)
            console.log(user)
        })
    }, [])

    useFocusEffect(
        useCallback(() => {
            async function getData() {
                setLoading(true)
                const response = await getServices(limit)
                console.log(response)
                if (response.statusResponse) {
                    setStartService(response.startservice)
                    setServices(response.services)
                }
                setLoading(false)
            }
            getData()
        }, [])
    )

    const handleLoadMore = async () => {
        if (!startRestaurant) {
            return
        }

        setLoading(true)
        const response = await getMoreServices(limit, startService)
        console.log(response)
        if (response.statusResponse) {
            setStartService(response.startService)
            setServices(...services, ...response.services)
        }
        setLoading(false)
    }

    if (user === null) {
        return <Loading isVisible={true} text="Cargando... " />
    }

    return (
        <View style={styles.viewBody}>
            {
                size(services) > 0
                    ? (
                        <ListServices
                            services={services}
                            navigation={navigation}
                            handleLoadMore={handleLoadMore}
                        >
                        </ListServices>
                    )
                    : (<View style={styles.notFoundView}>
                        <Text style={styles.notFoundText}>No hay servicios disponibles.</Text>
                    </View>)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    },
    notFoundView:{
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },
    notFoundText:{
        fontSize: 18,
        fontWeight: "bold"
    }
})
