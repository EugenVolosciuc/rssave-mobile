import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'

import MainLayout from '../components/layouts/MainLayout'
import { Empty } from '../components/ui'
import { useDataService } from '../utils/DataService'
import FeedItem from '../components/list-items/FeedItem'

const AllFeeds = ({ navigation }) => {
    const [feeds, setFeeds] = useState([])
    const DataService = useDataService()

    const handleAdd = () => navigation.navigate('Add Feed')

    const handleSearch = () => console.log("Open search")

    const headerOptions = {
        title: 'All Feeds',
        showHamburger: true,
        handleAdd,
        handleSearch
    }

    useEffect(() => {
        try {
            (async () => {
                const fetchedFeeds = await DataService.getAllFeeds()
                setFeeds(fetchedFeeds)
            })()
        } catch (error) {
            console.log("ERROR", error)
        }
    }, [DataService])

    return (
        <MainLayout headerOptions={headerOptions}>
            <FlatList 
                data={feeds}
                style={{ flex: 1 }}
                ListEmptyComponent={
                    <Empty 
                        content="No feeds added. Add a new feed by pressing the plus icon above."
                    />
                }
                renderItem={({ item }) => (
                    <FeedItem 
                        key={item.id}
                        item={item}
                        onPress={() => navigation.navigate(
                            'Single Feed', 
                            { feed: feeds.find(searchedFeed => searchedFeed.id === item.id) }
                        )}
                    />
                )}
            />
        </MainLayout>
    )
}

export default AllFeeds
