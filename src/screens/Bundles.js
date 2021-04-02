import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'

import MainLayout from '../components/layouts/MainLayout'
import { Empty } from '../components/ui'
import { useDataService } from '../utils/DataService'
import BundleItem from '../components/list-items/BundleItem'

const Bundles = ({ navigation }) => {
    const [bundles, setBundles] = useState([])
    const DataService = useDataService()

    const handleAdd = () => navigation.navigate('Add Bundle')

    const handleSearch = () => console.log("Open search")

    const headerOptions = {
        title: 'Bundles',
        showHamburger: true,
        handleAdd,
        // handleSearch
    }

    useEffect(() => {
        try {
            (async () => {
                const fetchedBundles = await DataService.getBundles()
                setBundles(fetchedBundles)
            })()
        } catch (error) {
            console.log("ERROR", error)
        }
    }, [DataService])

    return (
        <MainLayout headerOptions={headerOptions}>
            <FlatList 
                data={bundles}
                style={{ flex: 1 }}
                ListEmptyComponent={
                    <Empty 
                        content="No bundles added. Add a new bundle by pressing the plus icon above."
                    />
                }
                renderItem={({ item }) => (
                    <BundleItem 
                        key={item.id}
                        item={item}
                        onPress={() => navigation.navigate(
                            'Bundle Feeds', 
                            { bundle: bundles.find(searchedBundle => searchedBundle.id === item.id) }
                        )}
                    />
                )}
            />
        </MainLayout>
    )
}

export default Bundles
