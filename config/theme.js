import { DefaultTheme } from '@react-navigation/native'

export const defaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#607A9F',
        secondary: '#80C6BD',
        white: '#fff'
    },
    layout: {
        horizontalPadding: 8,
        verticalPadding: 8
    }
}