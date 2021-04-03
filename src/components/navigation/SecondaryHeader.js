import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'

const SecondaryHeader = ({ children }) => {
    const { colors } = useTheme()

    return (
        <View style={{...styles.container, backgroundColor: colors.white }}>
            {children}
        </View>
    )
}

export default SecondaryHeader

const styles = StyleSheet.create({
    container: {
        height: 46,
        justifyContent: 'center',
    }
})
