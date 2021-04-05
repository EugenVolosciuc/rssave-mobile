import React, { useState, useEffect, useMemo } from 'react'
import { FlatList } from 'react-native'
import axios from 'axios'
import parser from 'fast-xml-parser'
import isEmpty from 'lodash/isEmpty'

import MainLayout from '../components/layouts/MainLayout'
import articlesFinder from '../utils/functions/articlesFinder'
import ArticleItem from '../components/list-items/ArticleItem'
import { Loader, Empty } from '../components/ui'
import { useDataService } from '../utils/DataService'

const SingleFeed = ({ route, navigation }) => {
    const [articles, setArticles] = useState([])
    const [articlesAreLoading, setArticlesAreLoading] = useState(false)
    const [favourites, setFavourites] = useState([])

    const DataService = useDataService()

    const { feed } = route.params

    const headerOptions = {
        title: feed.title,
        showHamburger: false,
    }

    // Fetch articles from feed
    useEffect(() => {
        if (!isEmpty(feed)) {
            (async () => {
                try {
                    setArticlesAreLoading(true)
                    const { data: xmlResponse } = await axios.get(feed.url)
                    const jsonData = parser.parse(xmlResponse, { ignoreAttributes: false })
    
                    const articlesFromResponse = articlesFinder(jsonData)

                    setArticles(articlesFromResponse)
                    setArticlesAreLoading(false)
                } catch (error) {
                    setArticlesAreLoading(false)
                    console.log("ERROR getting feed articles", error)
                }
            })()
        }
    }, [feed, navigation])

    // Remove articles from screen when changing screen
    useEffect(() => {
        const unsubscribe = navigation.addListener(
            'blur',
            () => {
                setArticles([])
                navigation.setParams({ feed: {} })
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

    const renderItem = ({item}) => <ArticleItem item={item} isFavourite={favourites.some(favourite => favourite.title === item.title)} />
    const memoizedItem = useMemo(() => renderItem, [articles, favourites])

    return (
        <MainLayout headerOptions={headerOptions}>
            {articlesAreLoading || isEmpty(feed)
                ? <Loader text="Loading feed..." />
                : <FlatList
                    data={articles}
                    keyExtractor={(item, index) => item.title + '-' + index}
                    renderItem={memoizedItem}
                    ListEmptyComponent={<Empty content="No articles found in this feed, try again later." />}
                />
            }
        </MainLayout>
    )
}

export default SingleFeed
