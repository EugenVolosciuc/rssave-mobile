import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'

const acceptedSizes = ['sm', 'md', 'lg', 'xl']

const Typography = ({ children, size = "md", color, bold }) => {
    if (!acceptedSizes.includes(size)) throw new Error('Provide a valid size for the Typography component')

    const { colors } = useTheme()

    if (!color) color = colors.text

    const textStyles = {
        ...styles.text,
        ...styles[size],
        ...(bold && styles.bold),
        color
    }

    return (
        <View>
            <Text style={textStyles}>{children}</Text>
        </View>
    )
}

export default Typography

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Heebo_400',
        letterSpacing: .9
    },
    sm: {
        fontSize: 14
    },
    md: {
        fontSize: 16
    },
    lg: {
        fontSize: 18
    },
    xl: {
        fontSize: 20
    },
    bold: {
        fontFamily: 'Heebo_700'
    }
})
