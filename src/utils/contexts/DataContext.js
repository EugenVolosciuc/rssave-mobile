import React, { useState, useEffect, useRef, createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import isEqual from 'lodash/isEqual'

const ASYNC_STORAGE_APP_NAME = '@rssave'

export const emptyDataStructure = {
    bundles: [],
    favourites: [],
    feeds: []
}

export const dataContext = createContext(emptyDataStructure)

export default function DataProvider({ children }) {
    const mounted = useRef(false)
    const [data, setData] = useState(emptyDataStructure)

    // Load data when app opens - if any, otherwise set empty data
    useEffect(() => {
        (async () => {
            try {
                const loadedData = await AsyncStorage.getItem(ASYNC_STORAGE_APP_NAME)

                if (loadedData) return setData(JSON.parse(loadedData))

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
        if (mounted.current && isEqual(data, emptyDataStructure)) { // data wipe listener
            (async () => {
                try {
                    await AsyncStorage.removeItem(ASYNC_STORAGE_APP_NAME)
                } catch (error) {
                    console.log("Error removing data", error)
                }
            })()
        } else if (mounted.current) { // data update listener
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