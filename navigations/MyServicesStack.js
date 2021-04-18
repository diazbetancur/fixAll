import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import MyServices from '../screens/myServices/MyServices'


const Stack = createStackNavigator()

export default function MyServicesStack() {

    return (
        <Stack.Navigator>
           <Stack.Screen
                name = "MyServices"
                component = {MyServices}
                
                options = {{title : "Mis Servicios"}}
           />
            
       </Stack.Navigator>
    )
}
