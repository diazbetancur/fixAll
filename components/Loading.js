import React from 'react'
import { ActivityIndicator } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, Overlay } from 'react-native-elements'

export default function Loading({ isVisible, text }) {

    return (
        <Overlay
            isVisible={isVisible}
            windowBackgoundColor="rgba(0,0,0,0.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlay}
        >
            <View style={styles.view}>
                <Icon
                    type="material-community"
                    name="hammer-wrench"
                    color="#f0cc20"
                    style={styles.icon}
                ></Icon>
                <ActivityIndicator
                    size="large"
                    color="#f0cc20"
                />
                {
                    text && <Text style={styles.text}>{text}</Text>
                }
            </View>

        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        height: 100,
        width: 200,
        backgroundColor: "#fff",
        borderColor: "#f0cc20",
        borderWidth: 2,
        borderRadius: 10
    },
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "#f0cc20",
        marginTop: 10
    },
    icon: {
        flexDirection: "row",
        width: "50%"
    }
})
