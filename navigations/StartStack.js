import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import StartServices from '../screens/services/StartServices'

const Stack = createStackNavigator()

export default function StartStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="services"
                component={StartServices}
                options={{ title: "Servicios Disponibles" }}
            />
        </Stack.Navigator>
    )
}
