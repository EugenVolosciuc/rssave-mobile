import get from 'lodash/get'

// Check through various possible places an image could be placed in the feed
export default function findArticleImage(articleData) {
    let articleImage = null

    if (get(articleData, 'media:content.@_url', null)) {
        articleImage = articleData['media:content']['@_url']
    } else if (get(articleData, "summary['#text']", null)) {
        const textString = articleData.summary['#text']

        if (textString.includes('src=')) {
            articleImage = textString.substring(
                textString.lastIndexOf("src=\"") + 5,
                textString.lastIndexOf("\" ")
            )
        }
    }

    return articleImage
}