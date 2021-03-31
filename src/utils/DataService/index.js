import React, { useState, useEffect, useContext } from 'react'

import LocalDataService from './LocalDataService'
import GraphCMSDataService from './GraphCMSDataService'
import { dataContext } from '../contexts/DataContext'

// local (wip) | graphcms (not functional atm)
export const service = 'local'

const getDataService = (data, setData) => {
    switch (service) {
        case 'local':
            return new LocalDataService(data, setData)
        case 'graphcms':
            return new GraphCMSDataService()
        default:
            throw new Error('Incorrect data service provided')
    }
}

export function useDataService() {
    const { data, setData } = useContext(dataContext)
    const [DataService, setDataService] = useState(getDataService(data, setData))

    useEffect(() => {
        setDataService(getDataService(data, setData))
    }, [data])

    return DataService
}