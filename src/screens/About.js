import React from 'react'
import { View, Text, Image, StyleSheet, Spacer } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Constants from 'expo-constants'

import MainLayout from '../components/layouts/MainLayout'
import { Typography } from '../components/ui'

const logo = '../../assets/icon.png'

const About = () => {
    const { colors } = useTheme()

    const headerOptions = {
        title: 'About',
        showHamburger: false,
    }

    return (
        <MainLayout headerOptions={headerOptions}>
            <View style={styles.container}>
                <Image 
                    source={require(logo)}
                    style={styles.logo}
                />
                <Typography style={{ marginTop: 10 }} size="xl" bold>RSSave</Typography>
                <Typography>App version: {Constants.nativeAppVersion}</Typography>
                <Typography style={{ marginTop: 20 }}>Created by Eugen Volosciuc</Typography>
                <Typography>Contact: volosciuc.eugen@gmail.com</Typography>
            </View>
        </MainLayout>
    )
}

export default About

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40
    },
    logo: {
        width: 100,
        height: 100
    }
})