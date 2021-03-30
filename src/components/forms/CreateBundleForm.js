import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Input, Button } from '../ui'

const CreateBundleForm = () => {
    const [formData, setFormData] = useState({
        title: ''
    })

    const handleFormChange = (value, property) => {
        setFormData({
            ...formData,
            [property]: value
        })
    }

    return (
        <View style={styles.container}>
            <View>
                <Input
                    value={formData.title}
                    onChange={value => handleFormChange(value, 'title')}
                    label="Title"
                    placeholder="Add bundle title"
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button type="primary">Save</Button>
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