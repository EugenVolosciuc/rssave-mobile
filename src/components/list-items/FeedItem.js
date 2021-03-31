import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '@react-navigation/native'

import SimpleListItem from './SimpleListItem'
import { Typography } from '../ui'

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

    return (
        <SimpleListItem onPress={onPress} withPadding>
            <View
                style={styles.feedItem}
            >
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
