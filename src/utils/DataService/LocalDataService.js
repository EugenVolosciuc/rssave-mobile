import isEmpty from 'lodash/isEmpty'

import { emptyDataStructure } from '../contexts/DataContext'
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

    async modifyBundle(bundleData) {
        console.log("bundleData", bundleData)
        return
    }

    async removeBundle(bundleID) {
        const allBundles = this.localData.bundles
        let bundle, bundleIndex

        // Find bundle to be removed and its index
        for (let i = 0; i < allBundles.length; i++) {
            if (allBundles[i].id === bundleID) {
                bundle = allBundles[i]
                bundleIndex = i
                break
            }
        }

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

    async modifyFeed(feedData) {
        console.log("feedData", feedData)
        return
    }

    async removeFeed(feedID) {
        const allFeeds = this.localData.feeds
        let feed, feedIndex

        // Find feed to be removed and its index
        for (let i = 0; i < allFeeds.length; i++) {
            if (allFeeds[i].id === feedID) {
                feed = allFeeds[i]
                feedIndex = i
                break
            }
        }

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