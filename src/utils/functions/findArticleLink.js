import get from 'lodash/get'

const possiblePaths = [
    "enclosure[@_url]",
    "link['@_href']",
    "link"
]

export default function findArticleLink(articleData) {
    const correctPath = possiblePaths.find(path => get(articleData, path, null)) // might return undefined, in which case no path is good

    return get(articleData, correctPath, null)
}