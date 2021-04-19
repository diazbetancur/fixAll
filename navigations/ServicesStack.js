import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import Services from '../screens/services/Services'
import AddService from '../screens/services/AddService'
import StartServices from '../screens/services/StartServices'
import StartStack from './StartStack'
import SelectService from '../screens/services/SelectService'
import AddReviewService from '../screens/services/AddReviewService'

const Stack = createStackNavigator()

export default function ServicesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Inicio"
                component={SelectService}
                options={{ title: "Servicios Disponibles" }}
            />
            <Stack.Screen
                name="services"
                component={Services}
                options={{ title: "Servicios" }}
            />
            <Stack.Screen
                name="add-service"
                component={AddService}
                options={{ title: "Servicios" }}
            />
            <Stack.Screen
                name="add-review-service"
                component={AddReviewService}
                options={{ title: "Nuevo Comentario" }}
            />
        </Stack.Navigator>
    )
}
