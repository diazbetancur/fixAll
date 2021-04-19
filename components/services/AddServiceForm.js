import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert, Dimensions } from 'react-native'
import { Avatar, Button, Icon, Input, Image, CheckBox } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import { filter, isEmpty, map, size } from 'lodash'
import MapView from 'react-native-maps'
import uuid from 'random-uuid-v4'

import { getCurentLocation, loadImageFromGalery, validateEmail } from '../../utils/helpers'
import Modal from '../Modal'
import { addDocumentWithoutId, getCurrenUser, uploadImage } from '../../utils/actions'

const widthScreen = Dimensions.get("window").width

export default function AddServicesForm({ toastRef, setLoading, navigation }) {
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorName, setErrorName] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])
    const [isVisibleMap, setIsVisibleMap] = useState(false)
    const [location, setLocation] = useState(null)
    const [checked, setChecked] = useState(false);

    const addServiceInformation = async () => {
        if (!validForm()) {
            return
        }

        setLoading(true)
        const responseLoadImage = await uploadImages()
        const service = {
            name: formData.name,
            address: formData.address,
            description: formData.description,
            phone: formData.phone,
            callingCode: formData.callingCode,
            email: formData.email,
            location: location,
            images: responseLoadImage,
            rating: 0,
            ratingTotal: 0,
            quantityVouting: 0,
            creatAt: new Date(),
            createBy: getCurrenUser().uid,
            Type: checked
        }
        const responseAddDocument = await addDocumentWithoutId("services", service)

        setLoading(false)
        if (!responseAddDocument.statusResponse) {
            toastRef.current.show("Error creando el servicio, por favor intenta más tarde.")
            return
        }
        // Pendiente
        navigation.navigate("Inicio")
    }

    const uploadImages = async () => {
        const imagesUrl = []

        await Promise.all(
            map(imagesSelected, async (image) => {
                const response = await uploadImage(image, "services", uuid())
                if (response.statusResponse) {
                    imagesUrl.push(response.url)
                }
            })
        )

        return imagesUrl
    }

    const validForm = () => {
        clearError()
        let isValid = true

        if (isEmpty(formData.name)) {
            setErrorName("Debes ingresar el nombre del servicio")
            isValid = false
        }

        if (isEmpty(formData.address) && checked) {
            setErrorAddress("Debes ingresar la dirección del experto")
            isValid = false
        }

        if (isEmpty(formData.phone)) {
            setErrorPhone("Debes ingresar el teléfono del exerto")
            isValid = false
        }

        if (isEmpty(formData.description)) {
            setErrorDescription("Debes ingresar una descripción del servicio")
            isValid = false
        }

        if (isEmpty(formData.email)) {
            setErrorEmail("Debes ingresar el correo electronico del experto")
            isValid = false
        }

        if (!location && checked) {
            toastRef.current.show("Debes localizar el servicio en el mapa.")
            isValid = false
        } else if (size(imagesSelected) === 0) {
            toastRef.current.show("Debes agregar al menos una imagen al servicio.")
            isValid = false
        }

        if (!validateEmail(formData.email)) {
            setErrorEmail("Debes ingresar un correo electronico valido")
            isValid = false
        }

        if (size(formData.phone) < 10) {
            setErrorPhone("Debes ingresar un teléfono valido")
            isValid = false
        }
        return isValid
    }

    const clearError = () => {
        setErrorAddress(null)
        setErrorPhone(null)
        setErrorEmail(null)
        setErrorName(null)
        setErrorDescription(null)
    }
    return (
        <ScrollView style={styles.viewContainer}>
            <ImageService
                imageService={imagesSelected[0]}
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
                location={location}
                setChecked={setChecked}
                checked={checked}
            />
            <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title="Crear Servicio"
                onPress={addServiceInformation}
                buttonStyle={styles.btnAddService}
            />
            <MapService
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                setLocation={setLocation}
                toastRef={toastRef}
            ></MapService>
        </ScrollView>
    )
}

function MapService({ isVisibleMap, setIsVisibleMap, setLocation, toastRef }) {
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
        setLocation(newRegion)
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
function ImageService({ imageService }) {

    return (
        <View style={styles.viewPhoto}>
            <Image
                style={{ width: widthScreen, height: 200 }}
                source={
                    imageService
                        ? { uri: imageService }
                        : require("../../assets/no-image.png")
                }
            />
        </View>
    )
}
function UploadImage({ toastRef, imagesSelected, setImagesSelected }) {
    const imageSelect = async () => {
        const response = await loadImageFromGalery([4, 3])
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
                map(imagesSelected, (imageService, index) => (
                    <Avatar
                        key={index}
                        style={styles.miniatureStyle}
                        source={{ uri: imageService }}
                        onPress={() => removeImage(imageService)}
                    />
                ))
            }


        </ScrollView>
    )
}
function FormAdd({ formData, setFormData, errorName, errorAddress, errorPhone, errorDescription, errorEmail, setIsVisibleMap, location, setChecked, checked }) {
    const [country, setCountry] = useState("CO")
    const [callinCode, setCallinCode] = useState("57")
    const [phone, setPhone] = useState("")
    const [delivery, setDelivery] = useState(true)

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const changeInformation = () => {
        if (checked) {
            setChecked(false)
            setDelivery(true)
        }
        else {
            setChecked(true)
            setDelivery(false)
        }
    }
    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del Servicio"
                defaultValue={formData.name}
                onChange={(e) => onChange(e, "name")}
                errorMessage={errorName}
            />
            <CheckBox
                checkedColor="#f0cc20"
                uncheckedColor="#da5252"
                title="Servicio solo en sitio"
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={checked}
                onPress={changeInformation}
            />
            {
                !delivery &&
                (
                    <Input
                        placeholder="Dirección del Servicio"
                        defaultValue={formData.address}
                        onChange={(e) => onChange(e, "address")}
                        errorMessage={errorAddress}
                        rightIcon={{
                            type: "material-community",
                            name: "google-maps",
                            color: location ? "#f0cc20" : "#da5252",
                            onPress: () => setIsVisibleMap(true)
                        }}
                    />
                )
            }

            <Input
                keyboardType="email-address"
                placeholder="Email del Experto"
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
                    placeholder="WhatsApp del experto"
                    keyboardType="phone-pad"
                    containerStyle={styles.inputPhone}
                    defaultValue={formData.phone}
                    onChange={(e) => onChange(e, "phone")}
                    errorMessage={errorPhone}
                />
            </View>
            <Input
                placeholder="Descripción del servicio"
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
    btnAddService: {
        margin: 20,
        backgroundColor: "#f0cc20"
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
    viewMapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    viewMapBtnContainerSave: {
        paddingRight: 5
    },
    viewMapBtnContainerCancel: {
        paddingLeft: 5,
    },
    viewMapBtnCancel: {
        backgroundColor: "#7ab516"
    },
    viewMapBtnSave: {
        backgroundColor: "#7ab516"
    },
    typeService: {
        flexDirection: "row",
        justifyContent: "center",
        margin: 5
    }
})