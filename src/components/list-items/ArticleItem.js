import React from 'react'
import { StyleSheet, ImageBackground, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

import SimpleListItem from './SimpleListItem'
import findArticleImage from '../../utils/functions/findArticleImage'
import truncateString from '../../utils/functions/truncateString'
import { Typography } from '../ui'

const ArticleItem = ({ item }) => {
    const { colors } = useTheme()

    const articleImageURL = findArticleImage(item)
    const maxTitleLength = articleImageURL ? 70 : 90

    return (
        <SimpleListItem>
            <View style={styles.generalContainer}>
                <View style={{...styles.details, width: articleImageURL ? '75%' : '100%' }}>
                    <Typography>{truncateString(item.title, maxTitleLength)}</Typography>
                </View>
                <View style={styles.imageContainer}>
                    <ImageBackground style={styles.image} source={{ uri: articleImageURL }}>
                        <LinearGradient
                            colors={[colors.white, 'rgba(255, 255, 255, 0.7)', 'transparent']}
                            start={{ x: 0, y: 0.8 }}
                            end={{ x: 0.8, y: 0 }}
                            locations={[0.25, 0.6, 0.9]}
                            style={styles.imageGradient}
                        />
                    </ImageBackground>
                </View>
            </View>
        </SimpleListItem>
    )
}

export default ArticleItem

const styles = StyleSheet.create({
    generalContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 100
    },
    details: {
        padding: 15,
        zIndex: 2
    },
    imageContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
        width: '40%',
        borderRadius: 10
    },
    image: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        width: '100%',
        height: '100%'
    },
    imageGradient: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
})
