import React, { useState, useEffect } from 'react'
import AppLoading from 'expo-app-loading'
import 'react-native-get-random-values'

import Navigator from './src/components/navigation/Navigator'
import useFonts from './src/utils/hooks/useFonts'
import { service } from './src/utils/DataService'
import DataProvider from './src/utils/contexts/DataContext'

export default function App() {
	// NOTE: If local service, app should be loading until data is "fetched".
	// Moving dataLoaded bool in App instead of DataContext because here is where we add the AppLoading component 
	// and we can't access the data context in app, as it's not yet provided

	const [initialDataLoaded, setInitialDataLoaded] = useState(false)
	const { fontsLoaded } = useFonts()

	if (!fontsLoaded && (service === 'local' && !initialDataLoaded)) return <AppLoading />

	if (service === 'local') {
		return (
			<DataProvider
				dataLoaded={initialDataLoaded}
				setDataLoaded={setInitialDataLoaded}>
				<Navigator />
			</DataProvider>
		)
	}

	return <Navigator />
}