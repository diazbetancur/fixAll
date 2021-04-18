import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import StartServices from '../screens/services/StartServices'
import service from '../screens/services/service'

const Stack = createStackNavigator()

export default function SearchStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="services"
                component={StartServices}
                options={{ title: "Servicios Disponibles" }}
            />
            <Stack.Screen
                name="service"
                component={service}
            />
        </Stack.Navigator>
    )
}
