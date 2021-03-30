import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'

import { Typography } from '../ui'

const ScreenHeader = ({
    title,
    handleSearch,
    handleAdd,
    showHamburger = false
}) => {
    const { colors, layout } = useTheme()
    const navigation = useNavigation()

    const containerStyles = {
        ...styles.headerContainer,
        backgroundColor: colors.primary,
        paddingHorizontal: layout.horizontalPadding,
        paddingVertical: layout.verticalPadding
    }

    return (
        <View style={containerStyles}>
            <View style={styles.leftSideContainer}>
            {showHamburger 
                ? <Ionicons
                    name="menu-outline"
                    color={colors.white}
                    size={28}
                    onPress={navigation.openDrawer}
                    style={styles.hamburgerIcon}
                />
                : <Ionicons 
                    name="arrow-back"
                    color={colors.white}
                    size={28}
                    onPress={() => navigation.goBack()}
                    style={styles.backIcon}
                />
            }
            <Typography style={{ paddingTop: 2 }} size="lg" color={colors.white}>{title}</Typography>
            </View>
            <View style={styles.rightSideContainer}>
                {handleAdd &&
                    <Ionicons
                        name="add"
                        color={colors.white}
                        size={28}
                        onPress={handleAdd}
                    />
                }
                {handleSearch &&
                    <Ionicons 
                        name="search-outline"
                        color={colors.white}
                        size={22}
                        onPress={handleSearch}
                        style={styles.searchIcon}
                    />
                }
            </View>
        </View>
    )
}

export default ScreenHeader

const styles = StyleSheet.create({
    headerContainer: {
        height: 56,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    hamburgerIcon: {
        paddingRight: 10
    },
    backIcon: {
        paddingRight: 10
    },
    searchIcon: {
        paddingTop: 3,
        marginLeft: 10
    },
    leftSideContainer: {
        flexDirection: 'row'
    },
    rightSideContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})
