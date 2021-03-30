import React from 'react'
import { View, Text, Pressable, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'


const Button = ({ children, disabled, onPress, type = "primary" }) => {
    const { colors } = useTheme()

    const buttonStyles = {
        ...styles.button,
        ...(type === 'primary' && {
            backgroundColor: colors.primary,
            borderColor: 'rgba(0,0,0,0)',
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
            backgroundColor: colors.lightGray
        })
    }

    const textStyles = {
        ...styles.text,
        ...(type === 'primary' && {
            color: colors.white,
        }),
        ...(type === 'secondary' && {
            color: colors.primary,
        }),
        ...(disabled && {
            color: colors.darkGray
        })
    }

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

    return (
        <View style={{ borderRadius: 25, overflow: 'hidden' }}>
            <Touchable
                disabled={disabled}
                onPress={onPress}
                touchSoundDisabled={true}
            >
                <View style={buttonStyles}>
                    <Text style={textStyles}>{children}</Text>
                </View>
            </Touchable>
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
