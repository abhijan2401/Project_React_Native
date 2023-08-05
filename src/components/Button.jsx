import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.Btn} onPress={onPress}>
            <Text style={styles.BntText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    Btn: {
        borderRadius: 7,
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: "center",
        paddingVertical: 7,
        backgroundColor: "lightblue"
    },
    BntText: {
        fontSize: 19,
        color: "white",
        fontWeight: "700"
    }
})