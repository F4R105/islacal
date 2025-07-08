import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import getStyles from '@/lib/styles'

const converter = () => {
    const styles = getStyles()
    const [gregorianDate, setGregorianDate] = useState(null)
    const [hijriDate, setHijriDate] = useState(null)

    return (
        <SafeAreaView style={styles.wrapper}>
            {/* <View style={styles.header}>
                <Text style={styles.headerText}>Date converter</Text>
                <Text style={styles.subHeaderText}>
                    Convert normal to islamic calendar
                </Text>
            </View> */}
            <Text>converter</Text>
        </SafeAreaView>
    )
}

export default converter

const styles = StyleSheet.create({})