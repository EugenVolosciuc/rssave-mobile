import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'

import { Typography } from '../ui'

const ScreenHeader = ({ title, showHamburger = false }) => {
    const { colors, layout } = useTheme()
    const navigation = useNavigation()

    const containerStyles = {
        ...styles.headerContainer, 
        backgroundColor: colors.primary,
        paddingHorizontal: layout.horizontalPadding,
        paddingVertical: layout.verticalPadding
    }

    return (
        <View style={containerStyles}>
            {showHamburger && 
                <Ionicons 
                    name="menu" 
                    color={colors.white} 
                    size={28} 
                    onPress={navigation.openDrawer} 
                    style={styles.hamburgerIcon}
                />
            }
            <Typography size="lg" color={colors.white}>{title}</Typography>
        </View>
    )
}

export default ScreenHeader

const styles = StyleSheet.create({
    headerContainer: {
        height: 56,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    hamburgerIcon: {
        marginRight: 8
    }
})
