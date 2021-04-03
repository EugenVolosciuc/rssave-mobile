import React, { useState, useEffect, useMemo } from 'react'
import { FlatList } from 'react-native'
import axios from 'axios'
import parser from 'fast-xml-parser'
import { useNavigation } from '@react-navigation/native'
import isEmpty from 'lodash/isEmpty'

import MainLayout from '../components/layouts/MainLayout'
import articlesFinder from '../utils/functions/articlesFinder'
import ArticleItem from '../components/list-items/ArticleItem'
import { Loader, Empty } from '../components/ui'

const SingleFeed = ({ route }) => {
    const [articles, setArticles] = useState([])
    const [articlesAreLoading, setArticlesAreLoading] = useState(false)
    const navigation = useNavigation()

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

    const renderItem = ({item}) => <ArticleItem item={item} />
    const memoizedItem = useMemo(() => renderItem, [articles])

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
