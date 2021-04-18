import React , {useState, useRef , useEffect}from 'react'
import { Button } from 'react-native-elements'
import { View, Text ,StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import { closeSession , getCurrentUser} from '../../utils/actions'
import Toast from "react-native-easy-toast"
import InfoUser from '../../components/account/InfoUser'
import Loading from '../../components/Loading'
import AccountOptions from '../../components/account/AccountOptions'


export default function UserLogged() {

    const toastRef = useRef()
    const navigation =useNavigation()

    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [user, setUser] = useState(null)
    const [reloadUser, setReloadUser] = useState(false)


    useEffect(() => {
        setUser(getCurrentUser())
        setReloadUser(false)
    }, [reloadUser])


    return (
        <View>
             {
                user && (
                    <View>
                        <InfoUser 
                            user = {user} 
                            setLoading ={setLoading} 
                            setLoadingText = {setLoadingText}
                        />
                        <AccountOptions
                            user ={user}
                            toastRef = {toastRef}
                            setReloadUser = {setReloadUser}
                        />
                        
                    </View>
                )
            }
            
            <Button
                title ="Cerrar sesion"
                containerStyle = {styles.btnContainer}
                buttonStyle = {styles.closeSesionButton}
                onPress = {() => {
                    closeSession()
                    navigation.navigate("search")
                }}
            />
            <Toast ref = {toastRef} position = "center" opacity = {0.9} />
            <Loading isVisible = {loading} text = {loadingText}/>
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer:{
        marginTop: 20,
        width: "85%",
        alignSelf: "center"
    },
    closeSesionButton:{
        backgroundColor:"#cf2b2d"
    }
})
