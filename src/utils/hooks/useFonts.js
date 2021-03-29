import { useFonts as useHeeboFonts, Heebo_400Regular, Heebo_700Bold } from '@expo-google-fonts/heebo'

export default function useFonts() {
    const [heeboFontsLoaded] = useHeeboFonts({
        'Heebo_400': Heebo_400Regular,
        'Heebo_700': Heebo_700Bold
    })

    return { fontsLoaded: heeboFontsLoaded }
}