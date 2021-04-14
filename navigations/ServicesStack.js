import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import Services from '../screens/service/Services'

const Stack = createStackNavigator()

export default function ServicesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name = "services"
                component = {Services}
                options = {{title : "Servicios"}}
            />
        </Stack.Navigator>
    )
}
