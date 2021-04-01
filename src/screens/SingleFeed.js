import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import axios from 'axios'
import parser from 'fast-xml-parser'
import { useNavigation } from '@react-navigation/native'

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
    }, [feed])

    // Remove articles from screen when changing screen
    useEffect(() => {
        const unsubscribe = navigation.addListener(
            'blur',
            () => setArticles([])
        )

        return unsubscribe
    }, [navigation])

    return (
        <MainLayout headerOptions={headerOptions}>
            {articlesAreLoading
                ? <Loader text="Loading feed..." />
                : <FlatList
                    data={articles}
                    keyExtractor={(item, index) => item.title + '-' + index}
                    renderItem={({ item }) => <ArticleItem item={item} />}
                    ListEmptyComponent={<Empty content="No articles found in this feed, try again later." />}
                />
            }
        </MainLayout>
    )
}

export default SingleFeed
