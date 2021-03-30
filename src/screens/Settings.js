import React from 'react'
import { View, Text } from 'react-native'

import MainLayout from '../components/layouts/MainLayout'

const Settings = () => {
    const headerOptions = {
        title: 'Settings',
        showHamburger: true
    }

    return (
        <MainLayout headerOptions={headerOptions}>
            <Text>Settings screen</Text>
        </MainLayout>
    )
}

export default Settings
