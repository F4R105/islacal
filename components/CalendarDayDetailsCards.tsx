import { View, Text } from 'react-native'
import React from 'react'
import getStyles from '@/lib/styles'
import { CalendarDay } from '@/lib/types'

type CalendarDayProps = {
    calendarDay: CalendarDay
}

const CalendarDayDetailsCards = ({ calendarDay } : CalendarDayProps) => {
    const styles = getStyles()

    return (
        <>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Day {calendarDay.hijri.holidays.length > 0 && <>(✨'<Text style={styles.cardSubtitle}>{calendarDay.hijri.holidays[0]}</Text>)</>}</Text>
                <Text style={styles.cardValue}>
                    {calendarDay.hijri.day}, {calendarDay.hijri.weekday.en}
                </Text>
                <Text style={styles.arabic}>{calendarDay.hijri.weekday.ar}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Month <Text style={styles.cardSubtitle}>({calendarDay.hijri.month.days} days)</Text></Text>
                <Text style={styles.cardValue}>
                    {calendarDay.hijri.month.en} ({calendarDay.hijri.month.number})
                </Text>
                <Text style={styles.arabic}>{calendarDay.hijri.month.ar}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Year</Text>
                <Text style={styles.cardValue}>{calendarDay.hijri.year}</Text>
            </View>

            {calendarDay.hijri.holidays.length > 0 && (
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Holiday</Text>
                    {calendarDay.hijri.holidays.map((holiday, index) => (
                        <Text key={index} style={styles.holiday}>
                            🎉 {holiday}
                        </Text>
                    ))}
                </View>
            )}
        </>
    )
}

export default CalendarDayDetailsCards