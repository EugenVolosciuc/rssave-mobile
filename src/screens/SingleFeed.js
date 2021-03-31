import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'

import MainLayout from '../components/layouts/MainLayout'

const SingleFeed = ({ navigation, route }) => {
    const [articles, setArticles] = useState([])
    const { feed } = route.params
    
    const headerOptions = {
        title: feed.title,
        showHamburger: false,
    }

    console.log("FEED!!!", feed)

    useEffect(() => {
        try {
            
        } catch (error) {
            console.log("ERROR getting feed articles", error)
        }
    }, [])

    return (
        <MainLayout headerOptions={headerOptions}>
            <Text>It's only a test</Text>
        </MainLayout>
    )
}

export default SingleFeed
