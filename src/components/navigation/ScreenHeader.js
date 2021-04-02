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
    handleSave,
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
                <Typography size="lg" color={colors.white}>{title}</Typography>
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
                {handleSave &&
                    <Ionicons
                        name="save"
                        color={colors.white}
                        size={22}
                        onPress={handleSave}
                        style={styles.saveIcon}
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
        paddingRight: 10,
        paddingVertical: 5
    },
    backIcon: {
        paddingRight: 10,
        paddingVertical: 5
    },
    searchIcon: {
        paddingTop: 3,
        paddingBottom: 5,
        paddingLeft: 10
    },
    saveIcon: {
        paddingLeft: 10,
        paddingVertical: 5
    },
    leftSideContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightSideContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})
