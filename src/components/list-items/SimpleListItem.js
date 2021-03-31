import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import { useTheme } from '@react-navigation/native'

const SimpleListItem = ({ children, onPress, withPadding }) => {
    const { colors } = useTheme()

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View
                style={{
                    ...styles.container,
                    ...(withPadding && { padding: 10 }),
                    backgroundColor: colors.white
                }}
            >
                {children}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default SimpleListItem

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        marginBottom: 10
    }
})
