import React from 'react'
import { StyleSheet, SafeAreaView, View, Platform } from 'react-native'
import Constants from 'expo-constants'
import { useTheme } from '@react-navigation/native'

import ScreenHeader from '../navigation/ScreenHeader'
import SecondaryHeader from '../navigation/SecondaryHeader'

const MainLayout = ({ headerOptions, children, whiteBg, secondaryHeaderContent }) => {
    const { colors, layout } = useTheme()

    const innerContainerStyles = {
        ...styles.innerContainer,
        paddingVertical: layout.verticalPadding,
        paddingHorizontal: layout.horizontalPadding
    }

    return (
        <SafeAreaView style={{...styles.container, backgroundColor: whiteBg ? colors.white : colors.lightGray }}>
            <ScreenHeader {...headerOptions} />
            {secondaryHeaderContent && <SecondaryHeader>{secondaryHeaderContent}</SecondaryHeader>}
            <View style={innerContainerStyles}>
                {children}
            </View>
        </SafeAreaView>
    )
}

export default MainLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    },
    innerContainer: {
        width: '100%',
        flex: 1
    }
})
