import { fetchCalendarDayFromGregorianDate } from '@/lib/data';
import getStyles from '@/lib/styles';
import { CalendarDay } from '@/lib/types';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import CardListSkeleton from '@/components/CardListSkeleton';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CalendarDayDetailsCards from '@/components/CalendarDayDetailsCards';


const converter = () => {
    const styles = getStyles()

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

                <View style={styles.cardContainer}>
                    {loading ? (
                        <CardListSkeleton />
                    ) : (
                        calendarDay && (
                            <CalendarDayDetailsCards calendarDay={calendarDay} />
                        )
                    )
                    }
                </View>
            </ScrollView>
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => {
                    setShow(true);
                }}
            >
                <MaterialCommunityIcons name="calendar-edit" size={35} color={'white'} />
            </TouchableOpacity>
        </View>
    )
}

export default converter