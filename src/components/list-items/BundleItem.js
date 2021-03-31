import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'

import SimpleListItem from './SimpleListItem'
import { Typography } from '../ui'

const getStringNumOfFeeds = num => {
    switch (num) {
        case 1:
            return `${num} feed`
        default:
            return `${num} feeds`
    }
}

const BundleItem = ({ item, onPress }) => {
    const { colors } = useTheme()

    return (
        <SimpleListItem onPress={onPress} withPadding>
            <View
                style={{
                    ...styles.bundleItem,
                }}
            >
                <Typography size="lg">{item.title}</Typography>
                <Typography size="sm" color={colors.darkGray}>{getStringNumOfFeeds(item.feeds.length)}</Typography>
            </View>
        </SimpleListItem>
    )
}

export default BundleItem

const styles = StyleSheet.create({
    bundleItem: {
        borderWidth: 2,
        borderColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
        // paddingVertical: 8
    }
})
