import LocalDataService from './LocalDataService'
import GraphCMSDataService from './GraphCMSDataService'
// local | graphcms
const service = 'local'

let DataService

switch (service) {
    case 'local':
        DataService = new LocalDataService()
        break
    case 'graphcms':
        DataService = new GraphCMSDataService()
        break
    default:
        throw new Error('Incorrect data service provided')
}

export default DataService