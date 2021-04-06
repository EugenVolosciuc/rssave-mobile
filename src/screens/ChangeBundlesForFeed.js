import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import isEmpty from 'lodash/isEmpty'

import MainLayout from '../components/layouts/MainLayout'
import BundleItem from '../components/list-items/BundleItem'
import { Empty } from '../components/ui'
import { useDataService } from '../utils/DataService'

const ChangeBundlesForFeed = ({ route, navigation }) => {
    const [bundles, setBundles] = useState([])
    const [selectedBundles, setSelectedBundles] = useState([])

    const DataService = useDataService()

    const { feed } = route.params

    const handleSave = async () => {
        try {
            await DataService.changeFeedBundles(feed.id, selectedBundles)
            navigation.goBack()
        } catch (error) {
            console.log("ERROR", error)
        }
    }

    const checkBundleIsSelected = bundleID => selectedBundles.some(bundle => bundle?.id === bundleID)

    const toggleSelected = bundleID => {
        const bundleIsSelected = checkBundleIsSelected(bundleID)

        if (bundleIsSelected) {
            setSelectedBundles(selectedBundles.filter(bundle => bundle.id !== bundleID))
        } else {
            const addedBundle = bundles.find(bundle => bundle.id === bundleID)
            setSelectedBundles([...selectedBundles, addedBundle])
        }
    }

    const headerOptions = {
        title: `Change ${feed.title} bundles`,
        showHamburger: false,
        ...(!isEmpty(bundles) && { handleSave })
    }

    useEffect(() => {
        try {
            (async () => {
                const fetchedBundles = await DataService.getBundles()
                setBundles(fetchedBundles)
                setSelectedBundles(fetchedBundles.filter(bundle => bundle.feeds.includes(feed.id)))
            })()
        } catch (error) {
            console.log("ERROR", error)
        }
    }, [feed])

    return (
        <MainLayout headerOptions={headerOptions}>
            <FlatList
                data={bundles}
                style={{ flex: 1 }}
                ListEmptyComponent={
                    <Empty content="No bundles added." />
                }
                renderItem={({ item }) => (
                    <BundleItem
                        key={item.id}
                        item={item}
                        onPress={() => toggleSelected(item.id)}
                        selected={checkBundleIsSelected(item.id)}
                    />
                )}
            />
        </MainLayout>
    )
}

export default ChangeBundlesForFeed
