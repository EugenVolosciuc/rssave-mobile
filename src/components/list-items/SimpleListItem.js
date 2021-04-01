import React, { useState } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Modal, FlatList, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import isEmpty from 'lodash/isEmpty'

import ActionsModal from '../modals/ActionsModal'

const SimpleListItem = ({ children, onPress, withPadding, longPressActions = [] }) => {
    const [actionsModalVisible, setActionsModalVisible] = useState(false)
    const { colors } = useTheme()

    // TODO: add a prop called longPressActions: 
    // ex. [{ { title: 'Add to bundle', handler }, { title: 'Modify feed', handler }, { title: 'Remove feed', handler }]
    return (
        <TouchableWithoutFeedback 
            onPress={onPress} 
            onLongPress={() => isEmpty(longPressActions)
                ? null
                : setActionsModalVisible(!actionsModalVisible)
            }
        >
            <View
                style={{
                    ...styles.listItemContainer,
                    ...(withPadding && { padding: 10 }),
                    backgroundColor: colors.white
                }}>
                    <ActionsModal 
                        visible={actionsModalVisible} 
                        onRequestClose={() => setActionsModalVisible(!actionsModalVisible)} 
                        actions={longPressActions} 
                    />
                {children}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default SimpleListItem

const styles = StyleSheet.create({
    listItemContainer: {
        borderRadius: 10,
        marginBottom: 12
    }
})
