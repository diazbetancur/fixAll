import React,{useEffect,useState} from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { Icon } from 'react-native-elements'
import firebase from  'firebase/app'
import Loading from "../components/Loading"

import MyServices from '../screens/myServices/MyServices'
import AddService from '../screens/myServices/AddService'

const Stack = createStackNavigator()

export default function MyServicesStack({navigation}) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            userInfo ? setUser(true) : setUser(false)
        })
    }, [])
    console.log(user)
    if(user === null){
        return <Loading isVisible={true} text="Cargando"/>

    }

    return (
        <Stack.Navigator>
           <Stack.Screen
                name = "MyServices"
                component = {MyServices}
                
                options = {{
                    title : "Mis Servicios",
                    headerRight: ()=>(
                        <Icon
                            disabled = {user ? false : true}
                            //disabledStyle = {}
                            type = "material-community"
                            name='plus-thick'
                            iconStyle = {{color:"#f1cd21",
                                marginRight: 20,
                                fontSize: 40
                            }}
                            onPress={()=> navigation.navigate("add-service")}
                            
                        />
                        )
                    

                }}
           />
           <Stack.Screen
                name = "add-service"
                component = {AddService}
                options = {{title : "Crear Servicio"}}
            />
            
       </Stack.Navigator>
    )
}
