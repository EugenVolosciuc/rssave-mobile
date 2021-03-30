import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

const hiddenDrawerItems = ['Bundle Feeds']

const CustomDrawer = props => {
    const { state, ...rest } = props
    const newState = { ...state }
    newState.routes = newState.routes.filter(item => !hiddenDrawerItems.includes(item.name))

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList state={newState} {...rest} />
        </DrawerContentScrollView>
    )
}

export default CustomDrawer

