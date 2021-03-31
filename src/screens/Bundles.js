import React, { useState } from 'react'
import { View, Text } from 'react-native'

import MainLayout from '../components/layouts/MainLayout'
import { Button, Input } from '../components/ui'
import { useDataService } from '../utils/DataService'

const Bundles = ({ navigation }) => {
    const [value, setValue] = useState('')
    const DataService = useDataService()

    const handleAdd = () => navigation.navigate('Add Bundle')

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
                <Button onPress={() => console.log("Pressed")} type="primary">To Bundle Feeds</Button>
            </View>
            <View style={{ alignItems: 'flex-start' }}>
                <Input label={"test"} value={value} onChange={setValue} placeholder="Placeholder" />
            </View>
        </MainLayout>
    )
}

export default Bundles
