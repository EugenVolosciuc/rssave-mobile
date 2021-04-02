import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

const hiddenDrawerItems = [
    'Bundle Feeds',
    'Add Feed',
    'Add Bundle',
    'Single Feed',
    'Change Bundles for Feed',
    'Change Feeds for Bundle'
]

// gets modified state after filtering through drawer items that shouldn't appear in the drawer
const getNewDrawerState = state => {
    const newState = { ...state }

    newState.routeNames = newState.routeNames.filter(name => !hiddenDrawerItems.includes(name))
    newState.routes = newState.routes.filter(item => !hiddenDrawerItems.includes(item.name))

    return newState
}

const CustomDrawer = props => {
    const { state, ...rest } = props
    const newState = getNewDrawerState(state)

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList state={newState} {...rest} />
        </DrawerContentScrollView>
    )
}

export default CustomDrawer

