import React from 'react'
import { View, Text } from 'react-native'

import MainLayout from '../components/layouts/MainLayout'

const Bundles = ({ navigation }) => {
    const headerOptions = {
        title: 'Bundles',
        showHamburger: true
    }
    return (
        <MainLayout headerOptions={headerOptions}>
            <Text>This page appears</Text>
        </MainLayout>
    )
}

export default Bundles
