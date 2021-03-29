import React from 'react'
import { StyleSheet, SafeAreaView, View, Platform } from 'react-native'
import Constants from 'expo-constants'
import { useTheme } from '@react-navigation/native'

import ScreenHeader from '../navigation/ScreenHeader'

const MainLayout = ({ headerOptions, children }) => {
    const { colors, layout } = useTheme()

    const innerContainerStyles = {
        ...styles.innerContainer,
        paddingVertical: layout.verticalPadding,
        paddingHorizontal: layout.horizontalPadding
    }
    
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ScreenHeader {...headerOptions} />
                <View style={innerContainerStyles}>
                    {children}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default MainLayout

const styles = StyleSheet.create({
    container: {
        height: '100%',
        marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0
    },
    innerContainer: {
        width: '100%'
    }
})
