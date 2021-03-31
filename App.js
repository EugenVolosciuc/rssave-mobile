import React, { useState, useEffect } from 'react'
import AppLoading from 'expo-app-loading'
import 'react-native-get-random-values'

import Navigator from './src/components/navigation/Navigator'
import useFonts from './src/utils/hooks/useFonts'
import { service } from './src/utils/DataService'
import DataProvider from './src/utils/contexts/DataContext'

export default function App() {
	const { fontsLoaded } = useFonts()

	if (!fontsLoaded) return <AppLoading />

	if (service === 'local') {
		return (
			<DataProvider>
				<Navigator />
			</DataProvider>
		)
	} else {
		return <Navigator />
	}
}