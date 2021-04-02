import get from 'lodash/get'

const possiblePaths = [
    'published',
    'pubDate'
]

export default function findArticlePublishingDate(articleData) {
    const correctPath = possiblePaths.find(path => get(articleData, path, null)) // might return undefined, in which case no path is good
    const possibleDate = get(articleData, correctPath, null)

    if (!possibleDate) return null

    const date = new Date(Date.parse(possibleDate))

    const day = date.getDate().toString().length > 1 ? date.getDate() : `0${date.getDate()}`
    const month = (date.getMonth() + 1).toString().length > 1 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
    const year = date.getFullYear()
    const hours = date.getHours().toString().length > 1 ? date.getHours() : `0${date.getHours()}`
    const minutes = date.getMinutes().toString().length > 1 ? date.getMinutes() : `0${date.getMinutes()}`

    return `${day}.${month}.${year} ${hours}:${minutes}`
}