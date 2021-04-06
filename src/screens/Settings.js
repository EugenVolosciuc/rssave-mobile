import React from 'react'
import { SectionList, StyleSheet, Alert } from 'react-native'
import { useTheme } from '@react-navigation/native'

import MainLayout from '../components/layouts/MainLayout'
import { Typography } from '../components/ui'
import { useDataService } from '../utils/DataService'
import SettingItem from '../components/list-items/SettingItem'

const SettingHeader = ({ title }) => {
    const { colors } = useTheme()

    return <Typography
        style={styles.settingHeader}
        color={colors.darkGray}
        size="sm">
        {title}
    </Typography>
}

const Settings = ({ navigation }) => {
    const DataService = useDataService()

    const headerOptions = {
        title: 'Settings',
        showHamburger: true
    }

    const createDataRemovalAlert = () => Alert.alert(
        'Remove data',
        "Are you you want to wipe all app data? Your bundles, feeds and favourite articles will be lost.",
        [
            { text: 'Cancel' },
            {
                text: 'OK',
                onPress: async () => {
                    try {
                        await DataService.removeAllData()
                        navigation.navigate('All feeds')
                    } catch (error) {
                        console.log("ERROR", error)
                    }
                }
            }
        ]
    )

    const settingsList = [
        {
            sectionTitle: 'Data',
            data: [
                {
                    title: 'Remove app data',
                    onPress: createDataRemovalAlert // show confirmation popup
                }
            ]
        },
        {
            sectionTitle: 'Application',
            data: [
                {
                    title: 'About',
                    onPress: () => navigation.navigate('About')
                }
            ]
        }
    ]

    return (
        <MainLayout headerOptions={headerOptions} whiteBg>
            <SectionList
                style={{ marginTop: -10 }}
                sections={settingsList}
                keyExtractor={(item, index) => item.title + '-' + index}
                renderItem={({ item }) => <SettingItem item={item} />}
                renderSectionHeader={({ section: { sectionTitle } }) => <SettingHeader title={sectionTitle} />}
            />
        </MainLayout>
    )
}

export default Settings

const styles = StyleSheet.create({
    settingHeader: {
        textTransform: 'uppercase',
        marginTop: 10
    }
})