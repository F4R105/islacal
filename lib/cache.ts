import AsyncStorage from "@react-native-async-storage/async-storage";
import formatDate from "./date";
import { AppDataType } from "./types";

const getMonthKey = (year: number, month: number) => `hijri-calendar-${year}-${month}`;
const { month, year } = formatDate();
const currentKey = getMonthKey(year, month);

async function clearCache(option: 'all' | 'expired' = 'all') {
    try {
        const keys = await AsyncStorage.getAllKeys();
        switch (option) {
            case 'expired': {
                // 🧹 Filter all keys with names not equal to current month and year
                const oldKeys = keys.filter(key => key.startsWith('hijri-calendar-') && key !== currentKey)
                await AsyncStorage.multiRemove(oldKeys)
                break;
            }

            case 'all': {
                await AsyncStorage.multiRemove(keys)
                break;
            }
        }
    } catch (err) {
        throw new Error('Failed to clear cached data');
    }
}

export async function getCachedData() {
    try {
        clearCache('expired');
        // ✅ Try to load current month from cache
        const cached = await AsyncStorage.getItem(currentKey);

        if (!cached) return null;

        return JSON.parse(cached);
    } catch (error) {
        throw new Error('Failed to get cached calendar');
    }
}

export async function setCache(calendar: AppDataType) {
    try {
        clearCache();
        await AsyncStorage.setItem(currentKey, JSON.stringify(calendar));
    } catch (error) {
        throw new Error('Failed to set cached');
    }
}