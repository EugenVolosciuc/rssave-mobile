import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Modal, Image, Dimensions } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Typography, Button } from '../ui'

const getScreensData = setVisible => ([
    {
        title: <Typography style={styles.title} size="lg" bold>Welcome to RSSave</Typography>,
        content: <Typography style={styles.text}>The app that helps being up to date with everything that matters to you.</Typography>,
        img: require('../../../assets/illustrations/up-to-date.png')
    },
    {
        title: <Typography style={styles.title} size="lg" bold>Add a URL and you're ready to roll</Typography>,
        content: <Typography style={styles.text}>Add the title of your favourite podcast/news providers/whatever and their RSS feed URL and you're good to go.</Typography>,
        img: require('../../../assets/illustrations/url.png')
    },
    {
        title: <Typography style={styles.title} size="lg" bold>Keep feeds organized with bundles</Typography>,
        content: (
            <View>
                <Typography style={styles.text}>Long press a feed to add it to any of your bundles. Or vice-versa.</Typography>
                <Typography style={{...styles.text, marginTop: 4 }}>Doesn't matter, both ways work!</Typography>
            </View>
        ),
        img: require('../../../assets/illustrations/group.png')
    },
    {
        title: <Typography style={styles.title} size="lg" bold>It's that easy!</Typography>,
        content: <View>
            <Typography style={styles.text}>Now go ahead and start RSSaving!</Typography>
            <View style={styles.startButton}>
                <Button onPress={() => setVisible(false)} type="primary">Start</Button>
            </View>
        </View>,
        img: require('../../../assets/illustrations/easy.png')
    },
])

const ASYNC_STORAGE_APP_WAS_OPENED = '@rssave-was-opened'

const SLIDER_WIDTH = Dimensions.get('window').width + 80
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8)

const WelcomeScreenItem = ({ item, index }) => {
    return (
        <View style={styles.screenItem} key={index}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={item.img} onError={({ nativeEvent: { error }}) => console.log("ERROR LOADING IMAGE", error)} />
            </View>
            {item.title}
            {item.content}
        </View>
    )
}

const WelcomeModal = ({ onRequestClose }) => {
	const [showWelcomeModal, setShowWelcomeModal] = useState(true)
    const [currentDotIndex, setCurrentDotIndex] = useState(0)

    const carouselRef = useRef()
    const { colors } = useTheme()

    useEffect(() => {
		(async () => {
			const appWasOpenedBefore = await AsyncStorage.getItem(ASYNC_STORAGE_APP_WAS_OPENED)

			if (appWasOpenedBefore !== 'true') {
				setShowWelcomeModal(!showWelcomeModal)
				await AsyncStorage.setItem(ASYNC_STORAGE_APP_WAS_OPENED, 'true')
			}
		})()
	}, [])

    const screensData = getScreensData(setShowWelcomeModal)

    return (
        <Modal
            animationType="fade"
            style={{ zIndex: 1 }}
            visible={showWelcomeModal}
            onRequestClose={onRequestClose}
        >
            <TouchableWithoutFeedback onPress={onRequestClose}>
                <View style={{ ...styles.modal, backgroundColor: colors.white }}>
                    <Carousel
                        layoutCardOffset={9}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        ref={carouselRef}
                        layout="default"
                        data={screensData}
                        renderItem={WelcomeScreenItem}
                        onBeforeSnapToItem={slideIndex => setCurrentDotIndex(slideIndex)}
                    />
                    <Pagination 
                        dotsLength={screensData.length}
                        activeDotIndex={currentDotIndex}
                        dotStyle={{...styles.dot, backgroundColor: colors.primary }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        containerStyle={{ backgroundColor: 'transparent' }}
                    />
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default WelcomeModal

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    screenItem: {
        alignItems: 'center',
        width: ITEM_WIDTH,
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    title: {
        textAlign: 'center',
        marginTop: 30
    },
    text: {
        textAlign: 'center',
        marginTop: 8
    },
    imageContainer: {
        width: '60%',
        maxHeight: '40%',
        alignItems: 'center',
        flex: 1
    },
    image: {
        flex: 1,
        height: 50,
        resizeMode: 'contain'
    },
    startButton: {
        marginTop: 12
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8
    }
})