import { DefaultTheme } from '@react-navigation/native'

export const defaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#607A9F',
        secondary: '#80C6BD',
        white: '#F8F7FF',
        lightGray: '#EDEAEA',
        darkGray: '#808080',
        danger: '#D4656C'
    },
    layout: {
        horizontalPadding: 10,
        verticalPadding: 10
    }
}