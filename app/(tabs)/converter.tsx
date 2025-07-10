import { fetchCalendarDayFromGregorianDate } from '@/lib/data';
import getStyles, { getColors } from '@/lib/styles';
import { CalendarDay } from '@/lib/types';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import CardListSkeleton from '@/components/CardListSkeleton';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const converter = () => {
    const styles = getStyles()
    const colors = getColors()

    const [date, setDate] = useState(new Date());
    const [calendarDay, setCalendarDay] = useState<CalendarDay | null>(null);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleDateSelection = (
        event: DateTimePickerEvent,
        selectedDate: Date | undefined
    ) => {
        if (Platform.OS === 'android') setShow(false);
        if (selectedDate) setDate(selectedDate);
    };

    const convertDate = async (date: Date) => {
        try {
            setLoading(true);
            const calendarDay = await fetchCalendarDayFromGregorianDate(date);
            setCalendarDay(calendarDay);
        } catch (error) {
            router.push({
                pathname: '/error',
                params: { message: 'Something went wrong' }
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        convertDate(date);
    }, [date]);

    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Date converter</Text>
                <Text style={styles.subHeaderText}>
                    Normal to islamic calendar
                </Text>
                <Text style={[styles.info, { textAlign: 'right' }]}>
                    {
                        !loading && calendarDay ? (
                            <>
                                {calendarDay.gregorian.weekday.en},
                                {calendarDay.gregorian.day}-{calendarDay.gregorian.month.number}-{calendarDay.gregorian.year}
                            </>
                        ) : (
                            'Loading Selected date...'
                        )
                    }
                </Text>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                {show && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={handleDateSelection}
                        is24Hour={true}
                    />
                )}
                {calendarDay && (
                    <View style={styles.cardContainer}>
                        {
                            loading ? (
                                <CardListSkeleton />
                            ) : (
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
                                            <Text style={styles.cardTitle}>Holidays</Text>
                                            {calendarDay.hijri.holidays.map((holiday, index) => (
                                                <Text key={index} style={styles.holiday}>
                                                    - {holiday}
                                                </Text>
                                            ))}
                                        </View>
                                    )}
                                </>
                            )
                        }


                    </View>
                )}
            </ScrollView>
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => {
                    setShow(true);
                }}
            >
                <MaterialCommunityIcons name="calendar-edit" size={30} color={'white'} />
            </TouchableOpacity>
        </View>
    )
}

export default converter