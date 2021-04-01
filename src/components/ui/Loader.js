import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

import Typography from './Typography'

const Loader = ({ size = 'large', text = '' }) => {
    const { colors } = useTheme()

    return (
        <View style={styles.container}>
            <ActivityIndicator animating={true} color={colors.primary} size={size} />
            {text && <Typography color={colors.darkGray} style={styles.text}>{text}</Typography>}
        </View>
    )
}

export default Loader

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        marginVertical: 8
    }
})