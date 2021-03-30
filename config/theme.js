import { DefaultTheme } from '@react-navigation/native'

export const defaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#607A9F',
        secondary: '#80C6BD',
        white: '#F8F7FF',
        lightGray: '#CCC',
        darkGray: '#666',
        danger: '#FF5964'
    },
    layout: {
        horizontalPadding: 10,
        verticalPadding: 10
    }
}