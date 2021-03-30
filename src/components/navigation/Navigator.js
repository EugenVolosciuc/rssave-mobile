import React from 'react'
import { Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { StatusBar } from 'expo-status-bar'

import { defaultTheme } from '../../../config/theme'
import CustomDrawer from './CustomDrawer'
import {
    Bundles,
    BundleFeeds,
    AllFeeds,
    Settings,
    About
} from '../../screens'

const Drawer = createDrawerNavigator()

const Navigator = () => {
    const theme = defaultTheme

    return (
        <NavigationContainer theme={theme}>
            <StatusBar 
                backgroundColor={theme.colors.primary} 
                style={Platform.OS === 'android' ? "light" : "auto"} 
            />
            <Drawer.Navigator initialRouteName="Bundles" drawerContent={props => <CustomDrawer {...props} />}>
                <Drawer.Screen 
                    name="Bundles"
                    component={Bundles}
                />
                <Drawer.Screen 
                    name="All feeds"
                    component={AllFeeds}
                />
                <Drawer.Screen 
                    name="Bundle Feeds"
                    component={BundleFeeds}
                />
                <Drawer.Screen 
                    name="Settings"
                    component={Settings}
                />
                <Drawer.Screen 
                    name="About"
                    component={About}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default Navigator
