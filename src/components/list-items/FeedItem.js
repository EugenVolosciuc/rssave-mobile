import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { useTheme } from '@react-navigation/native'

import SimpleListItem from './SimpleListItem'
import { Typography } from '../ui'
import { useDataService } from '../../utils/DataService'

const getStringNumOfBundles = num => {
    switch (num) {
        case 1:
            return `In ${num} bundle`
        default:
            return `In ${num} bundles`
    }
}

const FeedItem = ({ item, onPress }) => {
    const { colors } = useTheme()
    const DataService = useDataService()

    const createFeedRemovalAlert = () => Alert.alert(
        `Remove ${item.title} feed`,
        'Are you sure you want to remove this feed? This does not remove favourite articles from the deleted feed.',
        [
            { text: 'Cancel' },
            {
                text: 'OK',
                onPress: async () => {
                    try {
                        await DataService.removeFeed(item.id)
                    } catch (error) {
                        console.log("ERROR", error)
                    }
                }
            }
        ]
    )

    const longPressActions = [
        {
            title: 'Change feed bundles',
            handler: () => console.log("Add to favourite articles")
        },
        {
            title: 'Modify feed',
            handler: () => console.log("Add to favourite articles")
        },
        {
            title: 'Remove feed',
            handler: createFeedRemovalAlert
        },
    ]

    return (
        <SimpleListItem onPress={onPress} longPressActions={longPressActions} withPadding>
            <View style={styles.feedItem}>
                <Typography size="lg">{item.title}</Typography>
                <Typography size="sm" color={colors.darkGray}>{getStringNumOfBundles(item.bundles.length)}</Typography>
            </View>
        </SimpleListItem>
    )
}

export default FeedItem

const styles = StyleSheet.create({
    feedItem: {
        borderWidth: 2,
        borderColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
