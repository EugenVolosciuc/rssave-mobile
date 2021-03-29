import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { StatusBar } from 'expo-status-bar'

import { defaultTheme } from '../../../config/theme'
import {
    Bundles,
    BundleFeeds,
    AllFeeds,
    Settings,
    About
} from '../../screens'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const Navigator = () => {
    const theme = defaultTheme

    return (
        <NavigationContainer theme={theme}>
            <StatusBar backgroundColor={theme.colors.primary} style="light" />
            <Drawer.Navigator>
                <Drawer.Screen 
                    name="Bundles"
                    component={Bundles}
                />
            </Drawer.Navigator>
            {/* <Stack.Navigator initialRouteName="Bundles">
                <Stack.Screen 
                    name="Bundles"
                    component={Bundles}
                />
            </Stack.Navigator> */}
        </NavigationContainer>
    )
}

export default Navigator
