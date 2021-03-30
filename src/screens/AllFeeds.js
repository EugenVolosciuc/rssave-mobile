import React from 'react'
import { View, Text } from 'react-native'

import MainLayout from '../components/layouts/MainLayout'

const AllFeeds = ({ navigation }) => {
    const headerOptions = {
        title: 'All Feeds',
        showHamburger: true,
    }

    return (
        <MainLayout headerOptions={headerOptions}>
            <Text></Text>
        </MainLayout>
    )
}

export default AllFeeds
