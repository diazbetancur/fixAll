import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { View, Text } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Search from '../screens/Search'
import Services from '../screens/Services'
import MyServices from '../screens/MyServices'
import Account from '../screens/Account'

const Tab = createBottomTabNavigator()

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name ="search"
                     component={Search}
                    options ={{title: "Buscar"}}
                 />
                 <Tab.Screen
                    name ="services"
                     component={Services}
                    options ={{title: "Servicios"}}
                 />
                 <Tab.Screen
                    name ="myservices"
                     component={MyServices}
                    options ={{title: "Mis Servicios"}}
                 />
                 <Tab.Screen
                    name ="account"
                     component={Account}
                    options ={{title: "Perfil"}}
                 />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
