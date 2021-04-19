import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Alert, Dimensions, ScrollView } from 'react-native'
import { Icon, ListItem, Rating } from 'react-native-elements'
import { map } from 'lodash'

import CarrouselImages from '../../components/CarrouselImages'
import Loading from '../../components/Loading'
import MapService from '../../components/MapService'
import { getDocumentById } from '../../utils/actions'
import { formatPhone } from '../../utils/helpers'
import ListReviews from '../../components/Services/ListReviews'

const widthScreen = Dimensions.get("window").width

export default function service({ navigation, route }) {
    const { id, name } = route.params
    const [service, setService] = useState(null)
    const [activeSlide, setActiveSlide] = useState(null)

    navigation.setOptions({ title: name })

    useEffect(() => {
        (async () => {
            const response = await getDocumentById("services", id)
            if (response.statusResponse) {
                setService(response.document)
            } else {
                setService({})
                Alert.alert("Ocurrio un error cargando el servicio, por favor intente más tarde.")
            }
        })()
    }, [])

    if (!service) {
        return <Loading isVisible={true} text="Cargando ..." />
    }

    return (
        <ScrollView style={styles.viewBody}>
            <CarrouselImages
                images={service.images}
                height={250}
                width={widthScreen}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
            />
            <TitleService
                name={service.name}
                description={service.description}
                rating={service.rating}
            />
            <ServiceInfo
                name={service.name}
                location={service.location}
                address={service.address}
                email={service.email}
                phone={formatPhone(service.callingCode, service.phone)}
            />
            <ListReviews
                navigation={navigation}
                id={service.id}
            />
        </ScrollView>
    )
}

function TitleService({ name, description, rating }) {
    return (
        <View style={styles.viewServicetTitle}>
            <View style={styles.viewServiceContainer}>
                <Text style={styles.nameService}>{name}</Text>
                <Rating
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                />
            </View>
            <Text style={styles.descriptionService}>{description}</Text>
        </View>
    )
}

function ServiceInfo({ name, location, address, email, phone }) {
    const listInfo = [
        { text: address, iconName: "map-marker" },
        { text: phone, iconName: "phone" },
        { text: email, iconName: "at" }
    ]
    return (
        <View style={styles.viewServiceInfo}>
            <Text style={styles.serviceTitle}>
                Información sobre el Servicio
            </Text>
            {
                location !== null ?
                    (
                        <MapService
                            location={location}
                            name={name}
                            height={150}
                        />
                    )
                    :
                    (
                        <Text style={styles.serviceInformation}>
                            Servicio a Domicilio
                        </Text>
                    )
            }

            {
                map(listInfo, (item, index) => (
                    <ListItem
                        key={index}
                        style={styles.containerListItem}
                    >
                        <Icon
                            type="material-community"
                            name={item.iconName}
                            color="#f0cc20"
                        />
                        <ListItem.Content>
                            <ListItem.Title>{item.text}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
    viewServiceTitle: {
        paddingTop: 15
    },
    viewServiceContainer: {
        flexDirection: "row"
    },
    nameService: {
        marginTop: 5,
        fontWeight: "bold"
    },
    descriptionService: {
        marginTop: 10,
        color: "gray",
        textAlign: "justify"
    },
    rating: {
        position: "absolute",
        right: 0,
        margin:5
    },
    viewServiceInfo: {
        margin: 15,
        marginTop: 5
    },
    serviceTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15
    },
    serviceInformation: {
        fontSize: 15,
        marginBottom: 15
    },
    containerListItem: {
        borderBottomColor: "#da5252",
        borderBottomWidth: 1
    },
    viewFavorite: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 100,
        padding: 5,
        paddingLeft: 15
    },
    textArea: {
        height: 50,
        paddingHorizontal: 10
    },
    btnSend: {
        backgroundColor: "#442848"
    },
    btnSendContainer: {
        width: "95%"
    },
    textModal: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold"
    },
    modalContainer: {
        justifyContent: "center",
        alignItems: "center"
    }
})
