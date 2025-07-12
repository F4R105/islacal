import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCachedData, setCache } from '@/lib/cache';
import { AppDataType } from '@/lib/types';
import { getNewData } from '@/lib/data';
import { router } from 'expo-router';

export type AppDataContextType = {
    appData: AppDataType | null;
    loading: boolean;
    refresh: () => void;
};

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const useAppData = () => {
    const context = useContext(AppDataContext);
    if (!context) {
        throw new Error('useAppData must be used within a AppDataProvider');
    }
    return context;
};

export const AppDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [appData, setAppData] = useState<AppDataType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getAppData = async () => {
        try {
            const cachedData = await getCachedData();
            if (!cachedData) {
                const newData = await getNewData();
                setAppData(newData);
                setCache(newData);
                return
            }

            setAppData(cachedData);
        } catch (error) {
            router.push({
                pathname: '/error',
                params: { message: 'Something went wrong' }
            });
        } finally {
            setLoading(false);
        }
    };

    const refreshAppData = async () => {
        try {
            setLoading(true);
            const newData = await getNewData();
            setAppData(newData);
            setCache(newData);
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
        getAppData();
    }, []);

    return (
        <AppDataContext.Provider value={{ appData, loading, refresh: refreshAppData }}>
            {children}
        </AppDataContext.Provider>
    );
};
