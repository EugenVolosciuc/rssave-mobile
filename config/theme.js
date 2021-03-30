import { DefaultTheme } from '@react-navigation/native'

export const defaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#607A9F',
        secondary: '#80C6BD',
        white: '#FFF',
        lightGray: '#CCC',
        darkGray: '#666'
    },
    layout: {
        horizontalPadding: 10,
        verticalPadding: 10
    }
}