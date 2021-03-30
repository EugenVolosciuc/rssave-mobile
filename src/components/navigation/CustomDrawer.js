import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

const hiddenDrawerItems = ['Bundle Feeds']

// gets modified state after filtering through drawer items that shouldn't appear in the drawer
const getNewDrawerState = state => {
    let removedItemsCount = 0
    const newState = { ...state }

    newState.routeNames = newState.routeNames.filter(name => !hiddenDrawerItems.includes(name))
    newState.routes = newState.routes.filter(item => {
        if (hiddenDrawerItems.includes(item.name)) {
            removedItemsCount++
            return false
        }

        return true
    })
    
    if (state.index > removedItemsCount) {
        newState.index -= state.routes.length - newState.routes.length
    }

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

