import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert, Dimensions } from 'react-native'
import { Avatar, Button, Icon, Input, Image } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import { filter, isEmpty, map, size } from 'lodash'
import MapView from 'react-native-maps'
import uuid from 'random-uuid-v4'

import { getCurentLocation, loadImageFromGallery, validateEmail } from '../../utils/helpers'
import Modal from '../Modal'
import { addDocumentWithoutId, getCurrenUser, uploadImage } from '../../utils/actions'

const widthScreen = Dimensions.get("window").width

export default function AddServiceForm({ toastRef, setLoading, navigation }) {
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorName, setErrorName] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])
    const [isVisibleMap, setIsVisibleMap] = useState(false)
    const [locationRestaurant, setLocationRestaurant] = useState(null)

    const addRestaurant = async() => {
        if(!validForm()){
            return
        }

        setLoading(true)
        const responseLoadImage = await uploadImages()
        const restaurant = {
            name: formData.name,
            address: formData.address,
            description: formData.description,
            phone: formData.phone,            
            callingCode: formData.callingCode,
            email: formData.email,
            location: locationRestaurant,
            images: responseLoadImage,
            rating:0,
            ratingTotal:0,
            quantityVouting:0,
            creatAt: new Date(),
            createBy: getCurrenUser().uid
        }
        const responseAddDocument = await addDocumentWithoutId("restaurants", restaurant)
        setLoading(false)
        console.log(responseAddDocument)
        if(!responseAddDocument.statusResponse){
            toastRef.current.show("Error guardando el restaurante, por favor intenta más tarde.")
            return
        }

        navigation.navigate("restaurants")
    }

    const uploadImages = async() =>{
        const imagesUrl = []

        await Promise.all(
            map(imagesSelected, async (image) => {
                const response = await uploadImage (image,"restaurants", uuid())
                if(response.statusResponse){
                    imagesUrl.push(response.url)
                }
            })
        )

        return imagesUrl
    }

    const validForm = () => {
        clearError()
        let isValid = true

        if(isEmpty(formData.name)){
            setErrorName("Debes ingresar el nombre del restaurante")
            isValid = false
        }

        if(isEmpty(formData.address)){
            setErrorAddress("Debes ingresar la dirección del restaurante")
            isValid = false
        }

        if(isEmpty(formData.phone)){
            setErrorPhone("Debes ingresar el teléfono del restaurante")
            isValid = false
        }

        if(isEmpty(formData.description)){
            setErrorDescription("Debes ingresar una descripción del restaurante")
            isValid = false
        }

        if(isEmpty(formData.email)){
            setErrorEmail("Debes ingresar el correo electronico del restaurante")
            isValid = false
        }

        if(!locationRestaurant){
            toastRef.current.show("Debes localizar el restaurante en el mapa.")
            isValid = false
        } else if (size(imagesSelected) === 0){
            toastRef.current.show("Debes agregar al menos una imagen al restaurante.")
            isValid = false
        }

        if(!validateEmail(formData.email)){
            setErrorEmail("Debes ingresar un correo electronico valido")
            isValid = false
        }

        if(size(formData.phone) < 10){
            setErrorPhone("Debes ingresar un teléfono valido")
            isValid = false
        }

        return isValid
    }

    const clearError = () =>{
        setErrorAddress(null)
        setErrorPhone(null)
        setErrorEmail(null)
        setErrorName(null)
        setErrorDescription(null)
    }
    return (
        <ScrollView style={styles.viewContainer}>
            <ImageRestaurant
                imageRestaurant={imagesSelected[0]}
            />
            <FormAdd
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorAddress={errorAddress}
                errorPhone={errorPhone}
                errorDescription={errorDescription}
                errorEmail={errorEmail}
                setIsVisibleMap={setIsVisibleMap}
                locationRestaurant={locationRestaurant}
            />
            <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title="Crear Restarante"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            />
            <MapRestaurant
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                setLocationRestaurant={setLocationRestaurant}
                toastRef={toastRef}
            ></MapRestaurant>
        </ScrollView>
    )
}
function MapRestaurant({ isVisibleMap, setIsVisibleMap, setLocationRestaurant, toastRef }) {
    const [newRegion, setNewRegion] = useState(null)
    useEffect(() => {
        (async () => {
            const response = await getCurentLocation()
            if (response.status) {
                setNewRegion(response.location)
            }
        })()
    }, [])

    const confirmLocation = () => {
        setLocationRestaurant(newRegion)
        toastRef.current.show("Localización guardada correctamente.", 3000)
        setIsVisibleMap(false)
    }

    return (
        <Modal
            isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}
        >
            <View>
                {
                    newRegion && (
                        <MapView
                            style={styles.mapStyle}
                            initialRegion={newRegion}
                            showsUserLocation={true}
                            onRegionChange={(region) => setNewRegion(region)}                                                     
                        >
                            <MapView.Marker
                                coordinate={{
                                    latitude: newRegion.latitude,
                                    longitude: newRegion.longitude
                                }}
                                draggable
                            />
                        </MapView>
                    )
                }
                <View style={styles.viewMapBtn}>
                    <Button
                        title="Guardar ubicación"
                        containerStyle={styles.viewMapBtnContainerSave}
                        buttonStyle={styles.viewMapBtnSave}
                        onPress={confirmLocation}
                    ></Button>
                    <Button
                        title="Calcelar ubicación"
                        containerStyle={styles.viewMapBtnContainerCancel}
                        buttonStyle={styles.viewMapBtnCancel}
                        onPress={() => setIsVisibleMap(false)}
                    ></Button>
                </View>
            </View>
        </Modal>
    )
}
function ImageRestaurant({ imageRestaurant }) {

    return (
        <View style={styles.viewPhoto}>
            <Image
                style={{ width: widthScreen, height: 200 }}
                source={
                    imageRestaurant
                        ? { uri: imageRestaurant }
                        : require("../../assets/no-image.png")
                }
            />
        </View>
    )
}
function UploadImage({ toastRef, imagesSelected, setImagesSelected }) {
    const imageSelect = async () => {
        const response = await loadImageFromGallery([4, 3])
        if (!response.status) {
            toastRef.current.show("No has seleccionado ninguna imagen.", 3000)
            return
        }

        setImagesSelected([...imagesSelected, response.image])
    }

    const removeImage = (image) => {
        Alert.alert(
            "Eliminar Imagen",
            "¿Esta seguro que desea eliminar la imagen?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Si",
                    onPress: () => {
                        setImagesSelected(
                            filter(imagesSelected, (imageUrl) => imageUrl !== image)
                        )
                    }
                }
            ],
            {
                cancelable: true
            }
        )
    }

    return (
        <ScrollView
            horizontal
            style={styles.viewImage}
        >
            {
                size(imagesSelected) < 10 && (
                    <Icon
                        type="material-community"
                        name="camera"
                        color="#7a7a7a"
                        containerStyle={styles.containerIcon}
                        onPress={imageSelect}
                    />
                )
            }
            {
                map(imagesSelected, (imageRestaurant, index) => (
                    <Avatar
                        key={index}
                        style={styles.miniatureStyle}
                        source={{ uri: imageRestaurant }}
                        onPress={() => removeImage(imageRestaurant)}
                    />
                ))
            }


        </ScrollView>
    )
}
function FormAdd({ formData, setFormData, errorName, errorAddress, errorPhone, errorDescription, errorEmail, setIsVisibleMap, locationRestaurant }) {
    const [country, setCountry] = useState("CO")
    const [callinCode, setCallinCode] = useState("57")
    const [phone, setPhone] = useState("")

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del restaurante"
                defaultValue={formData.name}
                onChange={(e) => onChange(e, "name")}
                errorMessage={errorName}
            />
            <Input
                placeholder="Dirección del restaurante"
                defaultValue={formData.address}
                onChange={(e) => onChange(e, "address")}
                errorMessage={errorAddress}
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: locationRestaurant ? "#7ab516" : "#c2c2c2",
                    onPress: () => setIsVisibleMap(true)
                }}
            />
            <Input
                keyboardType="email-address"
                placeholder="Email del restaurante"
                defaultValue={formData.email}
                onChange={(e) => onChange(e, "email")}
                errorMessage={errorEmail}
            />
            <View style={styles.phoneView}>
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    containerStyle={styles.countryPicker}
                    countryCode={country}
                    onSelect={(country) => {
                        setFormData({
                            ...formData,
                            "country": country.cca2,
                            "callingCode": country.callingCode[0]
                        })
                    }}
                />
                <Input
                    placeholder="WhatsApp del restaurante"
                    keyboardType="phone-pad"
                    containerStyle={styles.inputPhone}
                    defaultValue={formData.phone}
                    onChange={(e) => onChange(e, "phone")}
                    errorMessage={errorPhone}
                />
            </View>
            <Input
                placeholder="Descripción del restaurante"
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.description}
                onChange={(e) => onChange(e, "description")}
                errorMessage={errorDescription}
            />
        </View>
    )
}
const defaultFormValues = () => {
    return {
        name: "",
        description: "",
        phone: "",
        address: "",
        country: "CO",
        callingCode: "57",
        email: ""
    }
}

const styles = StyleSheet.create({
    inputPhone: {
        width: "80%"
    },
    phoneView: {
        width: "80%",
        flexDirection: "row"
    },
    viewContainer: {
        height: "100%"
    },
    viewForm: {
        marginHorizontal: 10
    },
    textArea: {
        height: 100,
        width: "100%"
    },
    btnAddRestaurant: {
        margin: 20,
        backgroundColor: "#8c6cac"
    },
    countryPicker: {},
    viewImage: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 30
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10
    },
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },
    mapStyle: {
        width: "100%",
        height: 550
    },
    viewMapBtn:{
        flexDirection:"row",
        justifyContent:"center",
        marginTop: 10
    },
    viewMapBtnContainerSave:{
        paddingRight: 5
    },
    viewMapBtnContainerCancel:{
        paddingLeft:5,        
    },
    viewMapBtnCancel:{
        backgroundColor: "#7ab516"
    },
    viewMapBtnSave:{
        backgroundColor: "#7ab516"
    }
})