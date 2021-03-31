import React, { useState, useEffect, useRef, createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const emptyDataStructure = {
    bundles: [],
    favourites: [],
    feeds: []
}

const ASYNC_STORAGE_APP_NAME = '@rssave'

export const dataContext = createContext({})

export default function DataProvider({ children }) {
    const mounted = useRef(false)
    const [data, setData] = useState({})

    // Load data when app opens - if any, otherwise set empty data
    useEffect(() => {
        (async () => {
            try {
                const data = await AsyncStorage.getItem(ASYNC_STORAGE_APP_NAME)
                console.log("data here", JSON.parse(data))

                if (data) return setData(JSON.parse(data))

                await AsyncStorage.setItem(
                    ASYNC_STORAGE_APP_NAME, 
                    JSON.stringify(emptyDataStructure)
                )
            } catch (error) {
                console.log("error", error)
            }
        })()

        mounted.current = true
    }, [])

    // When the data state changes, update the asyncStorage for consistency
    useEffect(() => {
        // TODO
        if (mounted.current && data?.bundles) {
            (async () => {
                try {
                    await AsyncStorage.setItem(
                        ASYNC_STORAGE_APP_NAME,
                        JSON.stringify(data)
                    )
                } catch (error) {
                    console.log("ERROR", error)
                }
            })()
        }
    }, [mounted.current, data])

    return (
        <dataContext.Provider value={{ data, setData }}>
            {children}
        </dataContext.Provider>
    )
}