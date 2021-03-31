import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { v4 as uuidv4 } from 'uuid'
import { useNavigation } from '@react-navigation/native'

import { Input, Button } from '../ui'
import { useDataService } from '../../utils/DataService'

const CreateBundleForm = () => {
    const [formData, setFormData] = useState({
        title: {
            value: '',
            error: null
        }
    })
    const navigation = useNavigation()
    const DataService = useDataService()

    const handleFormChange = (value, property) => {
        setFormData({
            ...formData,
            [property]: value
        })
    }

    const handleSubmit = () => {
        const bundleData = {
            id: uuidv4(),
            title: formData.title,
            createdAt: new Date().toISOString(),
            feeds: []
        }

        DataService.addBundle(bundleData)
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View>
                <Input
                    value={formData.title}
                    onChange={value => handleFormChange(value, 'title')}
                    label="Title"
                    placeholder="Add bundle title"
                    clearOnNavChange
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    onPress={handleSubmit} 
                    type="primary"
                    disabled={!formData.title.length}>
                    Save
                </Button>
            </View>
        </View>
    )
}

export default CreateBundleForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    inputContainer: {
        flex: 1
    },
    buttonContainer: {
        marginBottom: 8
    }
})