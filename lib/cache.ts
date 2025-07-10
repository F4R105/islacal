import AsyncStorage from "@react-native-async-storage/async-storage";
import formatDate from "./date";
import { AppDataType } from "./types";

const getMonthKey = (year: number, month: number) => `hijri-calendar-${year}-${month}`;
const { month, year } = formatDate();
const key = getMonthKey(year, month);


export async function getCachedData() {
    try {
        // 🧹 Clean up old months
        const keys = await AsyncStorage.getAllKeys();
        const calendarKeys = keys.filter(k => k.startsWith('hijri-calendar-') && k !== key);
        await AsyncStorage.multiRemove(calendarKeys);

        // ✅ Try to load current month from cache
        const cached = await AsyncStorage.getItem(key);

        if (!cached) return null;

        return JSON.parse(cached);
    } catch (error) {
        throw new Error('Failed to get cached calendar');
    }
}

export async function setCache(calendar: AppDataType) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(calendar));
    } catch (error) {
        throw new Error('Failed to set cached');
    }
}