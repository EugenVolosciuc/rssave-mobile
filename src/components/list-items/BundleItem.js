import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'

import SimpleListItem from './SimpleListItem'
import { Typography } from '../ui'
import { useDataService } from '../../utils/DataService'

const getStringNumOfFeeds = num => {
    switch (num) {
        case 1:
            return `${num} feed`
        default:
            return `${num} feeds`
    }
}

const BundleItem = ({ item, onPress, selected = null }) => {
    const { colors } = useTheme()
    const navigation = useNavigation()
    const DataService = useDataService()

    const createBundleRemovalAlert = () => Alert.alert(
        `Remove ${item.title} bundle`,
        `Are you sure you want to remove this bundle?${item.feeds.length ? ' This does not remove the feeds from the bundle.' : ''}`,
        [
            { text: 'Cancel' },
            {
                text: 'OK',
                onPress: async () => {
                    try {
                        await DataService.removeBundle(item.id)
                    } catch (error) {
                        console.log("ERROR", error)
                    }
                }
            }
        ]
    )

    const longPressActions = [
        {
            title: 'Change bundle feeds',
            handler: () => navigation.navigate('Change Feeds for Bundle', { bundle: item })
        },
        // {
        //     title: 'Modify bundle',
        //     handler: () => console.log('Modifying bundle')
        // },
        {
            title: 'Remove bundle',
            handler: createBundleRemovalAlert
        }
    ]

    return (
        <SimpleListItem
            onPress={onPress}
            longPressActions={longPressActions}
            selected={selected}
            withPadding>
            <View
                style={{
                    ...styles.bundleItem,
                }}
            >
                <Typography size="lg">{item.title}</Typography>
                    <Typography size="sm" color={colors.darkGray}>
                        {getStringNumOfFeeds(item.feeds.length)}
                    </Typography>
            </View>
        </SimpleListItem>
    )
}

export default BundleItem

const styles = StyleSheet.create({
    bundleItem: {
        flex: 1,
        borderWidth: 2,
        borderColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
        // paddingVertical: 8
    }
})
