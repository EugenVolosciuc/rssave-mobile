import React, { useState, useEffect, useMemo } from 'react'
import { FlatList, Platform, View, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Modal } from 'react-native'
import isEmpty from 'lodash/isEmpty'
import orderBy from 'lodash/orderBy'
import isNull from 'lodash/isNull'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Picker, PickerIOS } from '@react-native-picker/picker'
import { useTheme } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import MainLayout from '../components/layouts/MainLayout'
import { useDataService } from '../utils/DataService'
import ArticleItem from '../components/list-items/ArticleItem'
import { Loader, Empty, Typography } from '../components/ui'
import findArticlePublishingDate from '../utils/functions/findArticlePublishingDate'

dayjs.extend(customParseFormat)

const dateFormat = 'DD.MM.YYYY HH:mm'

const allFeedsOption = { value: null, label: 'All feeds' }

const FeedPicker = ({ feedToShow, setFeedToShow, options }) => {
    const [showFeedPicker, setShowFeedPicker] = useState(false)
    const { colors } = useTheme()

    const toggleFeedPicker = event => {
        if (event) event.isPropagationStopped()
        setShowFeedPicker(!showFeedPicker)
    }

    return Platform.OS === 'ios'
        ? (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={toggleFeedPicker}
            >
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={showFeedPicker}
                    onRequestClose={toggleFeedPicker}
                >
                    <View style={styles.modalContainer}>
                        <View style={{ ...styles.modal, backgroundColor: colors.white }}>
                            <PickerIOS
                                selectedValue={feedToShow.value}
                                onValueChange={value => {
                                    setFeedToShow({
                                        value,
                                        label: options.find(option => option.value === value).label
                                    })
                                    toggleFeedPicker()
                                }}
                            >
                                {options.map(option => (
                                    <Picker.Item
                                        key={option.value}
                                        value={option.value}
                                        label={option.label}
                                    />
                                ))}
                            </PickerIOS>
                        </View>
                    </View>
                </Modal>
                <View style={styles.iosPickerContainer}>
                    <Typography>{feedToShow.label}</Typography>
                    <Ionicons name="chevron-down" size={28} color={colors.text} />
                </View>
            </TouchableOpacity>
        )
        : (
            <Picker
                selectedValue={feedToShow.value}
                onValueChange={value => {
                    setFeedToShow({
                        value,
                        label: options.find(option => option.value === value).title
                    })
                }}
            >
                {options.map(option => (
                    <Picker.Item
                        key={option.value}
                        value={option.value}
                        label={option.label}
                    />
                ))}
            </Picker>
        )
}

const BundleFeeds = ({ navigation, route }) => {
    const [feedToShow, setFeedToShow] = useState(allFeedsOption)
    const [feedSelectionOptions, setFeedSelectionOptions] = useState([allFeedsOption])
    const [articlesAreLoading, setArticlesAreLoading] = useState(false)
    const [articles, setArticles] = useState([])
    const [favourites, setFavourites] = useState([])

    const DataService = useDataService()

    const { bundle } = route.params

    const headerOptions = {
        title: bundle.title,
        showHamburger: false,
    }

    useEffect(() => {
        if (!isEmpty(bundle)) {
            (async () => {
                try {
                    setArticlesAreLoading(true)
                    const feeds = await DataService.getBundleFeeds(bundle.id)

                    const selectedFeedURLs = feeds.reduce(
                        (accumulator, currentValue) => {
                            const showAllFeeds = isNull(feedToShow.value)
                            const showCurrentURL = feedToShow.value === currentValue.id

                            if (showAllFeeds || showCurrentURL) accumulator.push(currentValue.url)
                            return accumulator
                        },
                        []
                    )
                    const newFeedSelectionOptions = feeds.map(feed => ({ value: feed.id, label: feed.title }))

                    const fetchedArticles = await DataService.getArticlesFromFeeds(selectedFeedURLs)
                    const sortedArticles = orderBy(fetchedArticles, [article => dayjs(findArticlePublishingDate(article), dateFormat).unix()], ['desc'])

                    setFeedSelectionOptions([allFeedsOption, ...newFeedSelectionOptions])
                    setArticles(sortedArticles)
                    setArticlesAreLoading(false)
                } catch (error) {
                    setArticlesAreLoading(false)
                    console.log("ERROR", error)
                }
            })()
        }
    }, [bundle, navigation, feedToShow])

    // Remove articles from screen when changing screen
    useEffect(() => {
        const unsubscribe = navigation.addListener(
            'blur',
            () => {
                setArticles([])
                navigation.setParams({ bundle: {} })
            }
        )

        return unsubscribe
    }, [navigation])

    // Get favourites
    useEffect(() => {
        const unsubscribe = navigation.addListener(
            'focus',
            async () => {
                try {
                    const fetchedFavourites = await DataService.getFavourites()
                    setFavourites(fetchedFavourites)
                } catch (error) {
                    console.log("ERROR", error)
                }
            }
        )

        return unsubscribe
    }, [navigation, DataService])

    const renderItem = ({ item }) => <ArticleItem item={item} isFavourite={favourites.some(favourite => favourite.title === item.title)} />
    const memoizedItem = useMemo(() => renderItem, [articles])

    const shouldShowFeedPicker = feedSelectionOptions.length > 2

    return (
        <MainLayout
            headerOptions={headerOptions}
            secondaryHeaderContent={
                shouldShowFeedPicker
                    ? <FeedPicker
                        feedToShow={feedToShow}
                        setFeedToShow={setFeedToShow}
                        options={feedSelectionOptions}
                    />
                    : null
            }>
            {articlesAreLoading || isEmpty(bundle)
                ? <Loader text="Loading articles..." />
                : <FlatList
                    data={articles}
                    keyExtractor={(item, index) => item.title + '-' + index}
                    renderItem={memoizedItem}
                    ListEmptyComponent={
                        <Empty
                            content={
                                feedSelectionOptions.length > 1
                                    ? "No articles found in this bundle, try again later."
                                    : "Add a feed to this bundle to see its articles."
                            }
                        />
                    }
                />
            }
        </MainLayout>
    )
}

export default BundleFeeds

const styles = StyleSheet.create({
    iosPickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
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
})