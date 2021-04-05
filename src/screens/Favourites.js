import React, { useState, useEffect, useMemo } from 'react'
import { FlatList } from 'react-native'

import { useDataService } from '../utils/DataService'
import { Empty } from '../components/ui'
import ArticleItem from '../components/list-items/ArticleItem'
import MainLayout from '../components/layouts/MainLayout'

const Favourites = ({ navigation }) => {
    const [favourites, setFavourites] = useState([])
    const DataService = useDataService()

    const headerOptions = {
        title: "Favourites",
        showHamburger: true,
    }

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

    const renderItem = ({ item }) => (
        <ArticleItem
            item={item}
            isFavourite={favourites.some(favourite => favourite.title === item.title)}
            onFavouriteCallback={item => setFavourites(favourites.filter(favourite => favourite.title !== item.title))}
        />
    )
    const memoizedItem = useMemo(() => renderItem, [favourites])

    return (
        <MainLayout headerOptions={headerOptions}>
            <FlatList
                data={favourites.reverse()}
                style={{ flex: 1 }}
                keyExtractor={(item, index) => item.title + '-' + index}
                ListEmptyComponent={
                    <Empty
                        content="No favourite articles added. Save your favourite articles by long-pressing on an article from any feed."
                    />
                }
                renderItem={memoizedItem}
            />
        </MainLayout>
    )
}

export default Favourites
