import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import MainLayout from '../components/layouts/MainLayout'

const AddFeed = ({ navigation }) => {
    const headerOptions = {
        title: 'Add Feed',
        showHamburger: false,
    }

    return (
        <MainLayout headerOptions={headerOptions}>
            <Text>It's only a test</Text>
        </MainLayout>
    )
}

export default AddFeed

const styles = StyleSheet.create({})
