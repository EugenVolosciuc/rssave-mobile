import React, { useState, useEffect, useMemo } from 'react'
import { FlatList, Text } from 'react-native'
import isEmpty from 'lodash/isEmpty'
import orderBy from 'lodash/orderBy'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import MainLayout from '../components/layouts/MainLayout'
import { useDataService } from '../utils/DataService'
import ArticleItem from '../components/list-items/ArticleItem'
import { Loader, Empty } from '../components/ui'
import findArticlePublishingDate from '../utils/functions/findArticlePublishingDate'

dayjs.extend(customParseFormat)

const dateFormat = 'DD.MM.YYYY HH:mm'

const BundleFeeds = ({ navigation, route }) => {
    const [feedsToShow, setFeedsToShow] = useState({ value: null, label: 'All feeds' })
    const [articlesAreLoading, setArticlesAreLoading] = useState(false)
    const [articles, setArticles] = useState([])

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
    
                    const allFeedURLs = feeds.map(feed => feed.url)
                    const fetchedArticles = await DataService.getArticlesFromFeeds(allFeedURLs)

                    // Sort by date
                    // const sortedArticles = fetchedArticles.slice().sort((a, b) => {
                    //     // console.log("dayjs(findArticlePublishingDate(a), dateFormat).unix()", dayjs(findArticlePublishingDate(a), dateFormat).unix())
                    //     // console.log("dayjs(findArticlePublishingDate(b), dateFormat).unix()", dayjs(findArticlePublishingDate(b), dateFormat).unix())
                    //     return dayjs(findArticlePublishingDate(a), dateFormat).unix() - dayjs(findArticlePublishingDate(b), dateFormat).unix()
                    // })

                    const sortedArticles = orderBy(fetchedArticles, [article => dayjs(findArticlePublishingDate(article), dateFormat).unix()], ['desc'])

                    setArticles(sortedArticles)
                    setArticlesAreLoading(false)
                } catch (error) {
                    setArticlesAreLoading(false)
                    console.log("ERROR", error)
                }
            })()
        }
    }, [bundle, navigation, feedsToShow])

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

    const renderItem = ({ item }) => <ArticleItem item={item} />
    const memoizedItem = useMemo(() => renderItem, [articles])

    return (
        <MainLayout headerOptions={headerOptions}>
            {articlesAreLoading || isEmpty(bundle)
                ? <Loader text="Loading articles..." />
                : <FlatList
                    data={articles}
                    keyExtractor={(item, index) => item.title + '-' + index}
                    renderItem={memoizedItem}
                    ListEmptyComponent={<Empty content="No articles found in this bundle, try again later." />}
                />
            }
        </MainLayout>
    )
}

export default BundleFeeds
