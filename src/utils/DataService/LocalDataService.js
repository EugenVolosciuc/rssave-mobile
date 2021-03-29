class LocalDataService {
    // Bundle funcs
    async getBundles() {
        console.log("RETURNING BUNDLES!")
        return null
    }

    async addBundle(bundleData) {
        console.log("bundleData", bundleData)
        return
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
        return
    }

    async getBundleFeeds(bundleId) {
        console.log("bundleID", bundleId)
        return
    }

    async addFeed(feedData) {
        console.log("feedData", feedData)
        return
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
}

export default LocalDataService