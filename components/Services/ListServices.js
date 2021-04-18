import React, { useState, useEffect } from 'react'
import {useFocusEffect} from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'

export default function ListServices({ services, navigation, handleLoadMore }) {
    return (
        <View>
            <FlatList
                data={services}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={handleLoadMore}            
                renderItem={(service) => (
                    <Service service={service} navigation={navigation}/>
                )}
            />
        </View>
    )
}

function Service({ service, navigation, handleLoadMore }) {
    const { id, images, name, Type, description, phone, callingCode } = service.item
    const imageService = images[0]

    const goService = () => {
        navigation.navigate("service", {id, name})
    }

    return (
        <TouchableOpacity onPress={goService}>
            <View style={styles.viewService}>
                <View style={styles.viewServiceImage}>
                    <Image
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color="#FFFFFF" />}
                        source={{ uri: imageService }}
                        style={styles.imageService}
                    />
                </View>

                <View>
                    <Text style={styles.serviceTitle}>{name}</Text>
                    <Text style={styles.serviceInformation}>{Type}</Text>
                    <Text style={styles.serviceInformation}>{formatPhone(callingCode, phone)}</Text>
                    <Text style={styles.servieDesciption}>
                        {
                            size(description) > 60
                                ? `${description.substr(0, 60)} ...`
                                : description
                        }</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viewService: {
        flexDirection: "row",
        margin: 10
    },
    viewServiceImage: {
        margin: 15
    },
    imageService: {
        width: 90,
        height: 90
    },
    serviceTitle: {
        fontWeight: "bold"
    },
    serviceInformation: {
        paddingTop: 2,
        color: "grey"

    },
    serviceDescription: {
        paddingTop: 2,
        color: "grey",
        width: "75%"
    }
})
