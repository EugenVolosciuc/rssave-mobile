import React, { useEffect } from 'react'
import { View, TouchableWithoutFeedback, TextInput, Keyboard, Platform } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'

import Typography from './Typography'

const Input = ({
    value,
    onChange,
    label,
    placeholder = "",
    onSubmit = () => null,
    width = '100%',
    disabled,
    clearOnNavChange
}) => {
    const { colors } = useTheme()
    const navigation = useNavigation()

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

    useEffect(() => {
        if (clearOnNavChange) {
            const unsubscribe = navigation.addListener(
                'blur',
                () => onChange('')
            )
    
            return unsubscribe
        }
    }, [navigation])

    return (
        <View style={{ width }}>
            {label &&
                <Typography
                    style={{ marginBottom: 2 }}>
                    {label}
                </Typography>
            }
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={inputStyles}>
                    <TextInput
                        style={{ letterSpacing: 0.3 }}
                        placeholder={placeholder}
                        value={value.value}
                        onChangeText={onChange}
                        onSubmitEditing={onSubmit}
                        editable={!disabled}
                    />
                </View>
            </TouchableWithoutFeedback>
            {value.error &&
                <Typography
                    style={{ marginTop: 2 }}
                    color={colors.danger}>
                    {value.error}
                </Typography>
            }
        </View>
    )
}

export default Input
