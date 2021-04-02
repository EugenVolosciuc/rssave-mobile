import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Modal, FlatList, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { Typography } from '../ui'

const ActionsModal = ({ visible, setVisible, onRequestClose, actions }) => {
    const { colors } = useTheme()

    const handleActionPress = handler => {
        handler()
        setVisible(!visible)
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <TouchableWithoutFeedback onPress={onRequestClose}>
                <View style={styles.modalContainer}>
                    <View style={{ ...styles.modal, backgroundColor: colors.white }}>
                        <FlatList 
                            keyExtractor={(item, index) => item.title + '-' + index}
                            data={actions}
                            renderItem={({ item, index }) => {
                                const isLastItem = index === actions.length - 1

                                return <TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={() => handleActionPress(item.handler)}>
                                        <View style={{ 
                                            ...styles.actionItem,
                                            ...(isLastItem && { borderWidth: 0 }),
                                            borderBottomColor: colors.lightGray
                                        }}>
                                            <Typography>{item.title}</Typography>
                                        </View>
                                </TouchableOpacity>
                            }}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default ActionsModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    modal: {
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '90%',
        height: 'auto'
    },
    actionItem: {
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: 'transparent'
    }
})
