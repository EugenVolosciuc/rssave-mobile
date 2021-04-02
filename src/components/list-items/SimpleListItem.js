import React, { useState } from 'react'
import { StyleSheet, View, Modal, FlatList, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import isEmpty from 'lodash/isEmpty'
import isNull from 'lodash/isNull'
import { FontAwesome5 } from '@expo/vector-icons'

import ActionsModal from '../modals/ActionsModal'

// If selected === null, item shouldn't be selectable
const SimpleListItem = ({ children, onPress, withPadding, longPressActions = [], selected = null }) => {
    const [actionsModalVisible, setActionsModalVisible] = useState(false)
    const { colors } = useTheme()

    const isSelectable = !isNull(selected)
    const isSelected = selected === true

    // TODO: add a prop called longPressActions: 
    // ex. [{ { title: 'Add to bundle', handler }, { title: 'Modify feed', handler }, { title: 'Remove feed', handler }]
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            delayLongPress={250}
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
                {!isSelectable &&
                    <ActionsModal
                        visible={actionsModalVisible}
                        setVisible={setActionsModalVisible}
                        onRequestClose={() => setActionsModalVisible(!actionsModalVisible)}
                        actions={longPressActions}
                    />
                }
                {isSelectable
                    ? selected
                        ? <FontAwesome5 style={styles.selectIcon} name="check-circle" size={22} color={colors.primary} />
                        : <FontAwesome5 style={styles.selectIcon} name="circle" size={22} color={colors.text} />
                    : null
                }
                {children}
            </View>
        </TouchableOpacity>
    )
}

export default SimpleListItem

const styles = StyleSheet.create({
    listItemContainer: {
        borderRadius: 10,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    selectIcon: {
        marginRight: 6
    }
})
