// https://stackoverflow.com/questions/12393671/substring-regex-to-get-a-src-value-held-in-a-string/12393724
import get from 'lodash/get'

const possiblePathsWithDirectImage = [
    '[media:thumbnail][@_url]',
    '[media:content][@_url]',
    '[itunes:image][@_href]',
]

const possiblePathsWithHTMLimgTags = [
    "summary['#text']",
    'description'
]

const imgSourceRegex = /\ssrc=(?:(?:'([^']*)')|(?:"([^"]*)")|([^\s]*))/i

// Check through various possible places an image could be placed in the feed
export default function findArticleImage(articleData) {
    let articleImage = null
    let possibleCorrectPath

    possibleCorrectPath = possiblePathsWithDirectImage.find(path => get(articleData, path, null))
    
    if (get(articleData, possibleCorrectPath, null)) {
        articleImage = get(articleData, possibleCorrectPath)

        return articleImage
    }

    possibleCorrectPath = possiblePathsWithHTMLimgTags.find(path => get(articleData, path, null))
    
    const textString = get(articleData, possibleCorrectPath, null)
    
    if (textString) {
        if (textString.includes('src=')) {
            const regexMatchResult = textString.match(imgSourceRegex)
            articleImage = regexMatchResult[1] || regexMatchResult[2] || regexMatchResult[3]

            return articleImage
        }
    }

    return articleImage
}