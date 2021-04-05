import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'

import MainLayout from '../components/layouts/MainLayout'
import FeedItem from '../components/list-items/FeedItem'
import { Empty } from '../components/ui'
import { useDataService } from '../utils/DataService'

const ChangeFeedsForBundle = ({ route, navigation }) => {
    const [feeds, setFeeds] = useState([])
    const [selectedFeeds, setSelectedFeeds] = useState([])

    const DataService = useDataService()

    const { bundle } = route.params

    const handleSave = async () => {
        try {
            await DataService.changeBundleFeeds(bundle.id, selectedFeeds)
            navigation.goBack()
        } catch (error) {
            console.log("ERROR", error)
        }
    }

    const checkFeedIsSelected = feedID => selectedFeeds.some(feed => feed?.id === feedID)

    const toggleSelected = feedID => {
        const feedIsSelected = checkFeedIsSelected(feedID)

        if (feedIsSelected) {
            setSelectedFeeds(selectedFeeds.filter(feed => feed.id !== feedID))
        } else {
            const addedFeed = feeds.find(feed => feed.id === feedID)
            setSelectedFeeds([...selectedFeeds, addedFeed])
        }
    }

    const headerOptions = {
        title: `Change ${bundle.title} feeds`,
        showHamburger: false,
        handleSave
    }

    useEffect(() => {
        try {
            (async () => {
                const fetchedFeeds = await DataService.getAllFeeds()
                setFeeds(fetchedFeeds)
                setSelectedFeeds(fetchedFeeds.filter(feed => feed.bundles.includes(bundle.id)))
            })()
        } catch (error) {
            console.log("ERROR", error)
        }
    }, [bundle])

    return (
        <MainLayout headerOptions={headerOptions}>
            <FlatList
                data={feeds}
                style={{ flex: 1 }}
                ListEmptyComponent={<Empty content="No feeds added." />}
                renderItem={({ item }) => (
                    <FeedItem
                        key={item.id}
                        item={item}
                        onPress={() => toggleSelected(item.id)}
                        selected={checkFeedIsSelected(item.id)}
                    />
                )}
            />
        </MainLayout>
    )
}

export default ChangeFeedsForBundle
