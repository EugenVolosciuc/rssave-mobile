import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'

import Typography from './Typography'

const Empty = ({ text = "No data", containerStyle = {} }) => {
    const { colors } = useTheme()

    return (
        <View style={{...styles.container, ...containerStyle }}>
            <Typography style={styles.text} color={colors.darkGray}>{text}</Typography>
        </View>
    )
}

export default Empty

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        flex: 1
    },
    text: {
        textAlign: 'center'
    }
})
