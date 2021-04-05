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
    About,
    AddBundle,
    AddFeed,
    SingleFeed,
    ChangeFeedsForBundle,
    ChangeBundlesForFeed
} from '../../screens'
import WelcomeModal from '../modals/WelcomeModal'

const Drawer = createDrawerNavigator()

const Navigator = () => {
    const theme = defaultTheme

    return (
        <NavigationContainer theme={theme}>
            <StatusBar
                backgroundColor={theme.colors.primary}
                style={Platform.OS === 'android' ? "light" : "auto"}
            />
            {/* NOTE: If screen shouldn't appear in drawer, add it to the end of the list */}
            <Drawer.Navigator initialRouteName="All feeds" drawerContent={props => <CustomDrawer {...props} />}>
                <Drawer.Screen
                    name="All feeds"
                    component={AllFeeds}
                />
                <Drawer.Screen
                    name="Bundles"
                    component={Bundles}
                />
                <Drawer.Screen
                    name="Settings"
                    component={Settings}
                />
                <Drawer.Screen
                    name="About"
                    component={About}
                />
                <Drawer.Screen
                    name="Bundle Feeds"
                    component={BundleFeeds}
                />
                <Drawer.Screen
                    name="Add Feed"
                    component={AddFeed}
                />
                <Drawer.Screen
                    name="Add Bundle"
                    component={AddBundle}
                />
                <Drawer.Screen
                    name="Single Feed"
                    component={SingleFeed}
                />
                <Drawer.Screen
                    name="Change Bundles for Feed"
                    component={ChangeBundlesForFeed}
                />
                <Drawer.Screen
                    name="Change Feeds for Bundle"
                    component={ChangeFeedsForBundle}
                />
            </Drawer.Navigator>
            <WelcomeModal />
        </NavigationContainer>
    )
}

export default Navigator
