import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { v4 as uuidv4 } from 'uuid'
import { useNavigation } from '@react-navigation/native'
import isURL from 'validator/lib/isURL'

import { Input, Button } from '../ui'
import { useDataService } from '../../utils/DataService'

const CreateFeedForm = () => {
    const [formData, setFormData] = useState({
        title: {
            value: '',
            error: null
        },
        url: {
            value: '',
            error: null
        }
    })
    const navigation = useNavigation()
    const DataService = useDataService()

    const handleFormChange = (value, property) => {
        setFormData({
            ...formData,
            [property]: {
                value,
                error: null
            }
        })
    }

    const handleSubmit = () => {
        const { title, url } = formData
        if (!isURL(url.value)) {
            return setFormData({
                ...formData,
                url: {
                    value: formData.url.value,
                    error: 'Please add a valid URL'
                }
            })
        }

        const feedData = {
            id: uuidv4(),
            title: title.value,
            createdAt: new Date().toISOString(),
            url: url.value,
            bundles: []
        }

        DataService.addFeed(feedData)
        navigation.goBack()
    }

    const saveBtnIsDisabled = !formData.title || !formData.url

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
                <Button onPress={handleSubmit} type="primary" disabled={saveBtnIsDisabled}>Save</Button>
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