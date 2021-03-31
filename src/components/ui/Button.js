import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Typography from './Typography'

const Button = ({ children, disabled, onPress, type = "secondary" }) => {
    const { colors } = useTheme()

    const buttonStyles = {
        ...styles.button,
        ...(type === 'primary' && {
            backgroundColor: colors.primary,
            borderColor: 'transparent',
            borderWidth: 2,
            borderRadius: 25
        }),
        ...(type === 'secondary' && {
            backgroundColor: colors.white,
            borderColor: colors.primary,
            borderWidth: 2,
            borderRadius: 25
        }),
        ...(disabled && {
            backgroundColor: colors.lightGray,
            borderColor: colors.lightGray
        })
    }

    const textColor = disabled ? colors.darkGray : type === 'primary' ? colors.white : colors.primary

    return (
        <View style={{ borderRadius: 25, overflow: 'hidden' }}>
            <TouchableOpacity
                activeOpacity={0.6}
                disabled={disabled}
                onPress={onPress}
                touchSoundDisabled={true}
            >
                <View style={buttonStyles}>
                    <Typography style={styles.text} color={textColor}>{children}</Typography>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 24,
        paddingVertical: 10
    },
    text: {
        fontSize: 16,
        textAlign: 'center'
    }
})

export default Button
