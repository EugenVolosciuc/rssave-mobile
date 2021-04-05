import React, { useState } from 'react'
import { StyleSheet, ImageBackground, View, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import * as WebBrowser from 'expo-web-browser'
import { Ionicons } from '@expo/vector-icons'

import SimpleListItem from './SimpleListItem'
import findArticleLink from '../../utils/functions/findArticleLink'
import findArticleImage from '../../utils/functions/findArticleImage'
import findArticlePublishingDate from '../../utils/functions/findArticlePublishingDate'
import truncateString from '../../utils/functions/truncateString'
import { Typography } from '../ui'
import { useDataService } from '../../utils/DataService'

const ArticleItem = ({ item, isFavourite, selected = null, onFavouriteCallback }) => {
    const { colors } = useTheme()
    const DataService = useDataService()
    const [articleIsFavourite, setArticleIsFavourite] = useState(isFavourite)

    const articleLink = findArticleLink(item)
    const articleImageURL = findArticleImage(item)
    const articlePublishingDate = findArticlePublishingDate(item)

    const maxTitleLength = articleImageURL ? 70 : 90

    const handleFavourite = async () => {
        setArticleIsFavourite(!articleIsFavourite)

        if (onFavouriteCallback) {
            onFavouriteCallback(item)
        }

        if (articleIsFavourite) {
            await DataService.removeFavourite(item.title)
            return
        }

        await DataService.addFavourite(item)
    }

    const handleArticleItemPress = event => {
        if (articleLink) {
            WebBrowser.openBrowserAsync(articleLink)
        }
    }

    return (
        <SimpleListItem
            onPress={handleArticleItemPress}
            selected={selected}>
            <View style={styles.heartIconContainer}>
                <TouchableOpacity activeOpacity={0.6} onPress={handleFavourite}>
                    <View style={{
                        backgroundColor: colors.white, elevation: 4,
                        borderRadius: 50,
                        padding: 8,
                    }}>
                        <Ionicons
                            name={articleIsFavourite ? "heart" : "heart-outline"}
                            color={colors.primary}
                            size={22}
                            style={styles.heartIcon}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.generalContainer}>
                <View style={{ ...styles.details, width: articleImageURL ? '75%' : '100%' }}>
                    <Typography>{truncateString(item.title, maxTitleLength)}</Typography>
                    {articlePublishingDate &&
                        <Typography style={styles.publishingDate} size="sm" color={colors.darkGray}>{articlePublishingDate}</Typography>
                    }
                </View>
                <View style={styles.imageContainer}>
                    <ImageBackground imageStyle={styles.image} style={styles.image} source={{ uri: articleImageURL }}>
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
        height: 120
    },
    details: {
        paddingHorizontal: 15,
        zIndex: 2,
        justifyContent: 'space-between'
    },
    publishingDate: {
        marginTop: 8
    },
    heartIconContainer: {
        position: 'absolute',
        top: 4,
        right: 4,
        zIndex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
        width: '40%',
        borderRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
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
