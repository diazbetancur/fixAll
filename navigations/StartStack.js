import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import AllServices from '../screens/services/AllServices'

const Stack = createStackNavigator()

export default function StartStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="services"
                component={AllServices}
                options={{ title: "Servicios Disponibles" }}
            />
        </Stack.Navigator>
    )
}
