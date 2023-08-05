import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const Header = ({ title }) => {
    return (
        <View style={styles.Header}>
            <Text style={styles.HeaderText}>{title}</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    Header: {
        // borderWidth: 1,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    HeaderText: {
        fontSize: 18,
        color: "black",
        fontWeight: "700"
    }

})