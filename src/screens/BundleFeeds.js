import React from 'react'
import { View, Text } from 'react-native'

import MainLayout from '../components/layouts/MainLayout'

const BundleFeeds = ({ navigation }) => {
    const headerOptions = {
        title: 'Bundle Feeds',
        showHamburger: false,
    }

    return (
        <MainLayout headerOptions={headerOptions}>
            <Text>It's only a test</Text>
        </MainLayout>
    )
}

export default BundleFeeds
