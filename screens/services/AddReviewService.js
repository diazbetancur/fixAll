import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AirbnbRating, Button, Input, Rating } from 'react-native-elements'
import Toast from 'react-native-easy-toast'
import { isEmpty } from 'lodash'
import Loading from '../../components/Loading'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { addDocumentWithoutId, getCurrentUser, getDocumentById, updateDocumentById } from '../../utils/actions'

export default function AddReviewService({ navigation, route }) {
    const { id } = route.params
    const toastRef = useRef()

    const [rating, setRating] = useState(null)
    const [title, setTitle] = useState("")
    const [errorTitle, setErrorTitle] = useState(null)
    const [review, setReview] = useState("")
    const [errorReview, setErrorReview] = useState(null)
    const [loading, setLoading] = useState(false)

    const addReview = async () => {
        if (!ValidForm()) {
            return
        }
        setLoading(true)
        const user = getCurrentUser()

        const comentData ={
            idUser: user.uid,
            avatarUser: user.photoURL,
            idServices: id,
            title,
            rating,
            createAt: new Date()
        }

        const response = await addDocumentWithoutId("reviews", comentData)
        if(!response.statusResponse){
            setLoading(false)
            toastRef.current.show("Error enviando el comentario, por favor intenta más tarde.", 3000)
            return
        }

        const responseGetService = await getDocumentById("services", id)
        console.log(responseGetService.document)
        if(!responseGetService.statusResponse){
            setLoading(false)
            toastRef.current.show("Error obteniendo el servicio, por favor intenta más tarde.", 3000)
            return
        }

        const service = responseGetService.document
        const ratingTotal = service.ratingTotal + rating
        const quantityVouting = service.quantityVouting + 1
        const ratingResult = ratingTotal / quantityVouting

        const responseUpdateService = await updateDocumentById("services", id, {
            ratingTotal, quantityVouting, rating: ratingResult
        })

        if(!responseUpdateService.statusResponse){
            setLoading(false)
            toastRef.current.show("Error actualizando el servicio, por favor intenta más tarde.", 3000)
            return
        }
        setLoading(false)
        navigation.goBack()
    }

    const ValidForm = () => {
        setErrorTitle(null)
        setErrorReview(null)
        let isValid = true

        if (!Rating) {
            toastRef.current.show("Debes ingresar una puntuación.", 3000)
            isValid = false
        }
        if (isEmpty(title)) {
            setErrorTitle("Debe asignarle un titulo al comentario.")
            isValid = false
        }
        if (isEmpty(review)) {
            setErrorReview("Debes ingresar un comentario.")
        }
        return isValid
    }
    return (
        <KeyboardAwareScrollView style={styles.viewBody}>
            <View style={styles.viewRating}>
                <AirbnbRating
                    count={5}
                    reviews={["Malo", "Regular", "Normal", "Muy Bueno", "Excelente"]}
                    defaultRating={0}
                    size={25}
                    onFinishRating={(value) => setRating(value)}
                />
            </View>
            <View style={styles.formReview}>
                <Input
                    placeholder="Titulo ..."
                    containerStyle={styles.input}
                    onChange={(e) => setTitle(e.nativeEvent.text)}
                    errorMessage={errorTitle}
                />
                <Input
                    placeholder="Comentario ..."
                    containerStyle={styles.input}
                    style={styles.textArea}
                    multiline
                    onChange={(e) => setReview(e.nativeEvent.text)}
                    errorMessage={errorReview}
                />
                <Button
                    title="Enviar Comentarios"
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={addReview}
                />
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={loading} text="Enviando comentario..." />
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    },
    viewRating: {
        height: 110
    },
    formReview: {
        flex: 1,
        alignItems: "center",
        margin: 10,
        marginTop: 40
    },
    input: {
        marginBottom: 10
    },
    textArea: {
        height: 150,
        width: "100%",
        padding: 0,
        margin: 0
    },
    btnContainer: {
        flex: 1,
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10,
        width: "95%"
    },
    btn: {
        backgroundColor: "#f0cc20"
    }
})
