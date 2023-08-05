import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EmpInfo = ({ title, value }) => {
    return (
        <View style={styles.MainView}>
            <Text style={styles.TextVal}>{title} : </Text>
            <Text style={styles.TextVal}>{value}</Text>
        </View>
    )
}

export default EmpInfo

const styles = StyleSheet.create({
    MainView: {
        display: "flex",
        flexDirection: "row",
        marginVertical: 5

    },
    TextVal: {
        fontSize: 16,
        color: "black",
        fontWeight: "600"
    }
})