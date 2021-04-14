import React from 'react'
import { Button } from 'react-native-elements'
import { View, Text } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import { closeSession } from '../../utils/actions'

export default function UserLogged() {

    const navigation =useNavigation()

    return (
        <View>
            <Text>UserLogged</Text>
            <Button
                title ="cerrar sesion"
                onPress = {() => {
                    closeSession()
                    navigation.navigate("search")
                }}
            />
        </View>
    )
}
