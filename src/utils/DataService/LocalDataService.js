import { emptyDataStructure } from '../contexts/DataContext'
// NOTE: returning promises for all the methods to have a consistent flow for the different data service types (local/graphcms)
class LocalDataService {
    constructor(localData, setLocalData) {
        this.localData = localData
        this.setLocalData = setLocalData
    }

    // Bundle funcs
    // TODO: add sorting and search functionality
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

    async removeBundle(bundleId) {
        console.log("bundleId", bundleId)
        return
    }

    // Feed funcs
    async getAllFeeds() {
        return this.localData.feeds
    }

    async getBundleFeeds(bundleId) {
        console.log("bundleID", bundleId)
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

    async removeFeed(feedId) {
        console.log("feedId", feedId)
        return
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