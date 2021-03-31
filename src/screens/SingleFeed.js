import React from 'react'
import { Text } from 'react-native'

import MainLayout from '../components/layouts/MainLayout'

const SingleFeed = ({ navigation, route }) => {
    const { feed } = route.params
    
    const headerOptions = {
        title: feed.title,
        showHamburger: false,
    }

    console.log("FEED!!!", feed)

    return (
        <MainLayout headerOptions={headerOptions}>
            <Text>It's only a test</Text>
        </MainLayout>
    )
}

export default SingleFeed
