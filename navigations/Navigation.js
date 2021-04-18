import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import AccountStack from './AccountStack'
import MyServicesStack from './MyServicesStack'
import SearchStack from './SearchStack'
import ServicesStack from './ServicesStack'
import StartStack from './StartStack'

const Tab = createBottomTabNavigator()

export default function Navigation() {
    const screenOptions = (route, color) => {
        let iconName

        switch (route.name) {
            case "search":
                iconName = "magnify"
                break;
            case "services":
                iconName = "check-bold"
                break;
            case "myservices":
                iconName = "star"
                break;
            case "account":
                iconName = "card-account-details"
                break;
            case "Inicio":
                iconName = "hammer-wrench"
                break;
        }

        return (
            <Icon
                type="material-community"
                name={iconName}
                size={25}
                color={color}
            />
        )
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="search"
                tabBarOptions={{
                    inactiveTintColor: "#da5252",
                    activeTintColor: "#f0cc20"
                }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color)
                })}
            >
                <Tab.Screen
                    name="Inicio"
                    component={StartStack}
                    options={{ title: "Inicio" }}
                />
                <Tab.Screen
                    name="search"
                    component={SearchStack}
                    options={{ title: "Buscar" }}
                />
                <Tab.Screen
                    name="services"
                    component={ServicesStack}
                    options={{ title: "Servicios" }}
                />
                <Tab.Screen
                    name="myservices"
                    component={MyServicesStack}
                    options={{ title: "Mis Servicios" }}
                />
                <Tab.Screen
                    name="account"
                    component={AccountStack}
                    options={{ title: "Perfil" }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
