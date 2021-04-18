import React , { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AddServiceForm from '../../components/services/AddServiceForm'
import Toast from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loading from '../../components/Loading'


export default function AddService({navigation}) {
    const toastRef = useRef()
    const [loading, setLoading] = useState(false)
    return (
        <KeyboardAwareScrollView>
            <AddServiceForm 
                toastRef={toastRef} 
                setLoading={setLoading}
                navigation={navigation}
            />
            <Loading isVisible={loading} text="Creando Servicio..."/>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({})
