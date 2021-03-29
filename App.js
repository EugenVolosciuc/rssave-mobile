import React from 'react'
import AppLoading from 'expo-app-loading'

import Navigator from './src/components/navigation/Navigator'
import useFonts from './src/utils/hooks/useFonts'

export default function App() {
  const { fontsLoaded } = useFonts()

  if (!fontsLoaded) return <AppLoading />
  
  return (
    <>
      <Navigator />
    </>
  )
}