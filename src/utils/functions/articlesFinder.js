import get from 'lodash/get'
// Receives an RSS feed as JSON and returns the articles from the feed

// Tested feeds:
// Tofugu, Hacker News, NYT World, The Apology Line, Crime Junkie, The Experiment, Politico, Life Hacker, Japan Times, ZakZak

const possiblePaths = [
    'feed.entry',
    'rss.channel.item'
]

export default function articlesFinder(jsonData) {
    const correctPath = possiblePaths.find(path => get(jsonData, path, null)) // might return undefined, in which case no path is good

    return get(jsonData, correctPath, null)
}