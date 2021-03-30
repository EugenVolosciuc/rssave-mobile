import React from 'react'
import { View, Text } from 'react-native'

import MainLayout from '../components/layouts/MainLayout'

const About = () => {
    const headerOptions = {
        title: 'About',
        showHamburger: true,
    }

    return (
        <MainLayout headerOptions={headerOptions}>
            <Text>Work in progress</Text>
        </MainLayout>
    )
}

export default About
