import { StyleSheet, useColorScheme } from "react-native";

export default function getStyles() {
    const colorScheme = useColorScheme()
    const isDark = colorScheme === 'dark';

    return StyleSheet.create({
        wrapper: {
            flex: 1,
            backgroundColor: isDark ? '#1f2937' : '#f9fafb',
            paddingVertical: 20
        },
        container: {
            padding: 20,
            alignItems: 'center',
        },
        headerText: {
            fontSize: 28,
            fontWeight: '700',
            color: isDark ? '#e2e2e2' : '#1f2937',
        },
        subHeaderText: {
            fontSize: 18,
            color: isDark ? '#e2e2e2' : '#4b5563',
            marginTop: 4,
        },
        cardContainer: {
            width: '100%',
            alignItems: 'center',
            gap: 20,
            marginBottom: 20
        },
        card: {
            backgroundColor: isDark ? '#13191f' : 'white',
            borderRadius: 12,
            padding: 20,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 3,
            width: '100%',
            maxWidth: 500
        },
        cardTitle: {
            fontSize: 14,
            fontWeight: '600',
            color: isDark ? '#8e8e8e' : '#6b7280',
            marginBottom: 6,
            textTransform: 'uppercase',
        },
        cardSubtitle: {
            textTransform: 'capitalize',
            fontWeight: 'normal',
            fontSize: 12,
            fontStyle: 'italic'
        },
        cardValue: {
            fontSize: 22,
            fontWeight: '700',
            color: isDark ? '#e2e2e2' : '#111827',
        },
        success: {
            fontSize: 18,
            color: '#10b981',
            marginTop: 4,
            fontWeight: '600',
        },
        failure: {
            fontSize: 18,
            color: '#e75331',
            marginTop: 4,
            fontWeight: '600',
        },
        holiday: {
            fontSize: 22,
            fontWeight: '700',
            color: isDark ? '#e2e2e2' : '#111827',
        },
        listContainer: {
            paddingVertical: 15,
        },
        listItem: {
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        listItemTitle: {
            fontSize: 15,
            color: isDark ? '#e2e2e2' : '#1f2937'
        },
        listItemDetail: {
            color: '#8e8e8e',
            fontSize: 12
        },
        listItemSubTitle: {
            color: '#10b981',
        }
    });
}