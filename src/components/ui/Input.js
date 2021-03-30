import React from 'react'
import { View, TouchableWithoutFeedback, TextInput, Keyboard, Platform } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Typography from './Typography'

const Input = ({
    value,
    onChange,
    label,
    placeholder = "",
    onSubmit = () => null,
    width = '100%',
    disabled
}) => {
    const { colors } = useTheme()

    const inputStyles = {
        letterSpacing: 0.9,
        borderWidth: 2,
        borderRadius: 10,
        padding: Platform.OS === 'ios' ? 12 : 8,
        borderColor: colors.primary,
        ...(disabled && {
            backgroundColor: colors.lightGray,
            color: colors.darkGray,
            borderColor: colors.lightGray
        })
    }

    return (
        <View style={{ width }}>
            {label &&
                <Typography
                    style={{ color: colors.text, marginBottom: 2 }}>
                    {label}
                </Typography>
            }
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={inputStyles}>
                    <TextInput
                        style={{ letterSpacing: 0.3 }}
                        placeholder={placeholder}
                        value={value}
                        onChangeText={onChange}
                        onSubmitEditing={onSubmit}
                        editable={!disabled}
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default Input
