import React, { useContext } from 'react'

import LocalDataService from './LocalDataService'
import GraphCMSDataService from './GraphCMSDataService'
import { dataContext } from '../contexts/DataContext'

// local (wip) | graphcms (not functional atm)
export const service = 'local'

export function useDataService() {
    const { data, setData } = useContext(dataContext)

    let DataService

    switch (service) {
        case 'local':
            DataService = new LocalDataService(data, setData)
            break
        case 'graphcms':
            DataService = new GraphCMSDataService()
            break
        default:
            throw new Error('Incorrect data service provided')
    }

    return DataService
}