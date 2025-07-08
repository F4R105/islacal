import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCachedData, setCache } from '@/lib/cache';
import { AppDataType } from '@/lib/types';
import { getNewData } from '@/lib/data';

export type AppDataContextType = {
    appData: AppDataType | null;
    loading: boolean;
    error: string;
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
    const [error, setError] = useState<string>('');

    const getAppData = async () => {
        try {
            const cachedData = await getCachedData();
            if (!cachedData) {
                const newData = await getNewData();
                setAppData(newData);
                setCache(newData);
                setLoading(false);
                return
            }

            setAppData(cachedData);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch app data:', error);
            // setError(error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAppData();
    }, []);

    return (
        <AppDataContext.Provider value={{ appData, loading, error }}>
            {children}
        </AppDataContext.Provider>
    );
};
