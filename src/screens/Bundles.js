import React from 'react'
import { View, Text } from 'react-native'

import MainLayout from '../components/layouts/MainLayout'
import { Button } from '../components/ui'

const Bundles = ({ navigation }) => {
    const handleAdd = () => console.log("Add bundle")
    const handleSearch = () => console.log("Open search")

    const headerOptions = {
        title: 'Bundles',
        showHamburger: true,
        handleAdd,
        handleSearch
    }

    return (
        <MainLayout headerOptions={headerOptions}>
            <Text>This page appears</Text>
            <View style={{ alignItems: 'flex-start' }}>
                <Button onPress={() => navigation.navigate('Bundle Feeds')}>To Bundle Feeds</Button>
            </View>
            <View style={{ alignItems: 'flex-start' }}>
                <Button onPress={() => console.log("Pressed")}>To Bundle Feeds</Button>
            </View>
        </MainLayout>
    )
}

export default Bundles
