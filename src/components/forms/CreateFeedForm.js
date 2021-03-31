import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { v4 as uuidv4 } from 'uuid'
import { useNavigation } from '@react-navigation/native'

import { Input, Button } from '../ui'
import { useDataService } from '../../utils/DataService'

const CreateFeedForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        url: ''
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
        const feedData = {
            id: uuidv4(),
            title: formData.title,
            createdAt: new Date().toISOString(),
            url: formData.url,
            bundles: []
        }

        DataService.addFeed(feedData)
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={{ marginBottom: 10 }}>
                    <Input
                        value={formData.title}
                        onChange={value => handleFormChange(value, 'title')}
                        label="Title"
                        placeholder="Add feed title"
                        clearOnNavChange
                    />
                </View>
                <View>
                    <Input
                        value={formData.url}
                        onChange={value => handleFormChange(value, 'url')}
                        label="RSS feed link"
                        placeholder="Add feed URL"
                        clearOnNavChange
                    />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Button onPress={handleSubmit} type="primary">Save</Button>
            </View>
        </View>
    )
}

export default CreateFeedForm

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