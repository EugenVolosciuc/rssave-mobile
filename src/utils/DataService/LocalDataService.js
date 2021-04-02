import isEmpty from 'lodash/isEmpty'

import { emptyDataStructure } from '../contexts/DataContext'

const getItemAndItemIndexByID = (allItems, itemID) => {
    let item, itemIndex

    for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].id === itemID) {
            item = allItems[i]
            itemIndex = i
            break
        }
    }

    return { item, itemIndex }
}

// NOTE: returning promises for all the methods to have a consistent flow for the different data service types (local/graphcms)
class LocalDataService {
    constructor(localData, setLocalData) {
        this.localData = localData
        this.setLocalData = setLocalData
    }

    // Bundle funcs
    // TODO: add sorting functionality
    async getBundles() {
        return this.localData.bundles
    }

    async addBundle(bundleData) {
        this.setLocalData({
            ...this.localData,
            bundles: [
                ...this.localData.bundles,
                bundleData
            ]
        })
    }

    async changeBundleFeeds(bundleID, selectedFeeds) {
        const allBundles = this.localData.bundles
        const { item: modifiedBundle, itemIndex: bundleIndex } = getItemAndItemIndexByID(allBundles, bundleID)

        // 1. Change feeds array in bundle
        const selectedFeedIDs = selectedFeeds.map(feed => feed.id)
        modifiedBundle.feeds = selectedFeedIDs

        // 2. Change bundles array for every modified feed (added or removed)
        const allFeeds = [...this.localData.feeds]

        const modifiedFeeds = allFeeds.map(feed => {
            const feedCopy = { ...feed }

            if (!selectedFeedIDs.includes(feedCopy.id)) {
                feedCopy.bundles = feedCopy.bundles.filter(bundle => bundle !== bundleID)
            } else if (!feedCopy.bundles.includes(bundleID)) {
                feedCopy.bundles = [...feedCopy.bundles, bundleID]
            }

            return feedCopy
        })

        const bundlesCopy = [...this.localData.bundles]
        bundlesCopy[bundleIndex] = modifiedBundle

        this.setLocalData({
            ...this.localData,
            bundles: bundlesCopy,
            feeds: modifiedFeeds
        })
    }

    async modifyBundle(bundleData) {
        console.log("bundleData", bundleData)
        return
    }

    async removeBundle(bundleID) {
        const allBundles = this.localData.bundles
        const { item: bundle, itemIndex: bundleIndex } = getItemAndItemIndexByID(allBundles, bundleID)

        // Remove bundle from feeds if it has any feeds in it
        let updatedFeeds = [...this.localData.feeds]
        if (!isEmpty(bundle.feeds)) {
            updatedFeeds = updatedFeeds.map(mappedFeed => {
                if (mappedFeed.bundles.includes(bundleID)) {
                    mappedFeed.bundles = mappedFeed.bundles.filter(filteredBundle => filteredBundle === bundleID)
                }

                return mappedFeed
            })
        }

        // Remove bundle
        const bundlesCopy = [...this.localData.bundles]
        bundlesCopy.splice(bundleIndex, 1)

        this.setLocalData({
            ...this.localData,
            feeds: updatedFeeds,
            bundles: bundlesCopy
        })
    }

    // Feed funcs
    async getAllFeeds() {
        return this.localData.feeds
    }

    async getBundleFeeds(bundleID) {
        console.log("bundleID", bundleID)
        return
    }

    async addFeed(feedData) {
        this.setLocalData({
            ...this.localData,
            feeds: [
                ...this.localData.feeds,
                feedData
            ]
        })
    }

    async changeFeedBundles(feedID, selectedBundles) {
        const allFeeds = this.localData.feeds
        const { item: modifiedFeed, itemIndex: feedIndex } = getItemAndItemIndexByID(allFeeds, feedID)

        // 1. Change bundles array in feed
        const selectedBundleIDs = selectedBundles.map(bundle => bundle.id)
        modifiedFeed.bundles = selectedBundleIDs

        // 2. Change feeds array for every modified bundle (added or removed)
        const allBundles = [...this.localData.bundles]

        const modifiedBundles = allBundles.map(bundle => {
            const bundleCopy = { ...bundle }

            if (!selectedBundleIDs.includes(bundleCopy.id)) {
                bundleCopy.feeds = bundleCopy.feeds.filter(feed => feed !== feedID)
            } else if (!bundleCopy.feeds.includes(feedID)) {
                bundleCopy.feeds = [...bundleCopy.feeds, feedID]
            }

            return bundleCopy
        })

        const feedsCopy = [...this.localData.feeds]
        feedsCopy[feedIndex] = modifiedFeed

        this.setLocalData({
            ...this.localData,
            feeds: feedsCopy,
            bundles: modifiedBundles
        })
    }

    async modifyFeedData(feedID, feedData) {
        console.log("feedData", feedData)
        return
    }

    async removeFeed(feedID) {
        const allFeeds = this.localData.feeds
        const { item: feed, itemIndex: feedIndex } = getItemAndItemIndexByID(allFeeds, feedID)

        // Remove feed from feeds if it has any feeds in it
        let updatedBundles = [...this.localData.bundles]
        if (!isEmpty(feed.bundles)) {
            updatedBundles = updatedBundles.map(mappedBundle => {
                if (mappedBundle.feeds.includes(feedID)) {
                    mappedBundle.feeds = mappedBundle.feeds.filter(filteredFeed => filteredFeed === feedID)
                }

                return mappedBundle
            })
        }

        // Remove feed
        const feedsCopy = [...this.localData.feeds]
        feedsCopy.splice(feedIndex, 1)

        this.setLocalData({
            ...this.localData,
            bundles: updatedBundles,
            feeds: feedsCopy
        })
    }

    // Favourite funcs
    async getFavourites() {
        return
    }

    async addFavourite(favouriteData) {
        return
    }

    async removeFavourite(favouriteId) {
        return
    }

    // General funcs
    async removeAllData() {
        this.setLocalData(emptyDataStructure)
    }
}

export default LocalDataService