import React, {useState,useEffect, useCallback } from 'react'
import {useFocusEffect} from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { size } from 'lodash'
import firebase from 'firebase/app'

import ListServices from '../../components/Services/ListServices'
import { getMoreServices, getServices } from '../../utils/actions'
import Loading from '../../components/Loading'

export default function SelectService({navigation}) {
    const [user, setUser] = useState(null)
    const [services, setServices] = useState([])
    const [startService, setStartService] = useState(null)
    const [loading, setLoading] = useState(false)

    const limit = 7

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            userInfo ? setUser(true) : setUser(false)
        })
    }, [])

    useFocusEffect(
        useCallback(() => {
            async function getData() {
                setLoading(true)
                const response = await getServices(limit)
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
            {
                user && (
                    <Icon
                        type="material-community"
                        name="clipboard-plus-outline"
                        color="#f0cc20"
                        reverse
                        containerStyle={styles.btnContainer}
                        onPress={() => navigation.navigate("services")}
                    />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5
    },
    viewBody: {
        flex: 1
    },
    notFoundView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    notFoundText: {
        fontSize: 18,
        fontWeight: "bold"
    }
})
