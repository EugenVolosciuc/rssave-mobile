import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { Typography } from '../ui'

const SettingItem = ({ item}) => {
    const { colors } = useTheme()

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={item.onPress}
        >
            <View
                style={{
                    ...styles.settingItem,
                    borderBottomColor: colors.lightGray
                }}
            >
                <Typography>{item.title}</Typography>
            </View>
        </TouchableOpacity>
    )
}

export default SettingItem

const styles = StyleSheet.create({
    settingItem: {
        borderWidth: 1, 
        borderColor: 'transparent',
        paddingVertical: 10
    }
})
