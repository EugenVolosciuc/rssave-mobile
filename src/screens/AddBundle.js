import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import MainLayout from '../components/layouts/MainLayout'
import CreateBundleForm from '../components/forms/CreateBundleForm'

const AddBundle = ({ navigation }) => {
    const headerOptions = {
        title: 'Add Bundle',
        showHamburger: false,
    }

    return (
        <MainLayout headerOptions={headerOptions}>
            <CreateBundleForm />
        </MainLayout>
    )
}

export default AddBundle

const styles = StyleSheet.create({})
