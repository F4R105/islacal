// context/CalendarContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getCurrentDate from '@/lib/date';

export type HijriCalendarDay = {
    hijri: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string; ar: string };
        month: { number: number; en: string; ar: string; days: number };
        year: string;
        designation: { abbreviated: string; expanded: string };
        holidays: string[];
        adjustedHolidays: string[];
        method: string;
    };
    gregorian: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string };
        month: { number: number; en: string };
        year: string;
        designation: { abbreviated: string; expanded: string };
        lunarSighting: boolean;
    };
};

export type CurrentMonthCalendar = HijriCalendarDay[]

export type CalendarContextType = {
    calendar: CurrentMonthCalendar | null;
    loading: boolean;
};

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const useCalendar = () => {
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error('useCalendar must be used within a CalendarProvider');
    }
    return context;
};

const getMonthKey = (year: string, month: string) => `hijri-calendar-${year}-${month}`;

export const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
    const [calendar, setCalendar] = useState<HijriCalendarDay[] | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchCalendar = async () => {
        const { month, year } = getCurrentDate()
        const key = getMonthKey(year, month);

        try {
            // 🧹 Clean up old months
            const keys = await AsyncStorage.getAllKeys();
            const calendarKeys = keys.filter(k => k.startsWith('hijri-calendar-') && k !== key);
            await AsyncStorage.multiRemove(calendarKeys);

            // ✅ Try to load current month from cache
            const cached = await AsyncStorage.getItem(key);
            if (cached) {
                setCalendar(JSON.parse(cached));
                setLoading(false);
                return;
            }

            const response = await fetch(`https://api.aladhan.com/v1/gToHCalendar/${month}/${year}`);
            const { data } = await response.json();

            await AsyncStorage.setItem(key, JSON.stringify(data));
            setCalendar(data);
        } catch (error) {
            console.error('Failed to fetch calendar:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCalendar();
    }, []);

    return (
        <CalendarContext.Provider value={{ calendar, loading }}>
            {children}
        </CalendarContext.Provider>
    );
};
