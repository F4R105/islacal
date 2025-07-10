import { StyleSheet, useColorScheme } from "react-native";

export function getColors() {
    const colorScheme = useColorScheme()
    const isDark = colorScheme === 'dark';
    return {
        backgroundColor: isDark ? 'black' : 'white',
        foregroundColor: isDark ? '#13191f' : 'white',
        skeletonColor: isDark ? '#1f2e3bc4' : '#b9b9b991',
        textColor: isDark ? '#e2e2e2' : '#111827',
        primaryColor: '#10b981',
        accentColor: '#f18d36',
        success: '#10b981',
        failure: '#e75331',
        info: '#f18d36',
    }
}

export default function getStyles() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const colors = getColors();

    return StyleSheet.create({
        wrapper: {
            flex: 1,
            backgroundColor: colors.backgroundColor,
            paddingTop: 50
        },
        container: {
            padding: 10,
            alignItems: 'center',
        },
        header: {
            paddingHorizontal: 15,
            marginBottom: 10
        },
        headerText: {
            fontSize: 18,
            fontWeight: '700',
            color: isDark ? '#e2e2e2' : '#1f2937',
        },
        subHeaderText: {
            fontSize: 15,
            color: isDark ? '#e2e2e2' : '#4b5563',
            marginTop: 4,
            // marginLeft: 10
        },
        cardContainer: {
            width: '100%',
            alignItems: 'center',
            gap: 20,
            marginBottom: 20
        },
        card: {
            backgroundColor: colors.foregroundColor,
            borderRadius: 12,
            padding: 20,
            width: '100%',
            maxWidth: 500,
            elevation: 3, // optional if you're targeting Android
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
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
        arabic: {
            fontSize: 20,
            color: colors.primaryColor,
            marginTop: 4,
            fontWeight: '600',
        },
        info: {
            color: colors.info,
            fontStyle: 'italic',
            marginTop: 10,
            fontWeight: '500'
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
            fontSize: 20,
            color: isDark ? '#e2e2e2' : '#1f2937',
            fontWeight: '500'
        },
        listItemDetail: {
            color: '#8e8e8e',
            fontSize: 12
        },
        listItemSubTitle: {
            color: '#10b981',
            fontSize: 20
        },
        buttonContainer: {
            padding: 20,
        },
        button: {
            width: '100%',
            paddingVertical: 10,
            borderRadius: 3,
            maxWidth: 300,
            marginHorizontal: 'auto',
            backgroundColor: colors.primaryColor,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5
        },
        skeletonCard: {
            backgroundColor: colors.foregroundColor,
            justifyContent: 'space-between',
            borderRadius: 12,
            padding: 20,
            width: '100%',
            maxWidth: 500,
            height: 120,
            elevation: 3, // optional if you're targeting Android
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
        },
        bigSkeletonCard: {
            backgroundColor: colors.foregroundColor,
            justifyContent: 'space-between',
            borderRadius: 12,
            padding: 20,
            width: '100%',
            maxWidth: 500,
            marginBottom: 25,
            elevation: 3, // optional if you're targeting Android
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
        },
        bigSkeletonCardTitle: {
            width: '30%',
            height: 25,
            borderRadius: 5,
            backgroundColor: colors.skeletonColor,
            marginBottom: 20
        },
        itemTitleSkeleton: {
            backgroundColor: colors.skeletonColor,
            height: 25,
            marginBottom: 10
        },
        itemSubtitleSkeleton: {
            backgroundColor: colors.skeletonColor,
            height: 15,
            marginBottom: 10
        },
        itemArabicSkeleton: {
            backgroundColor: colors.skeletonColor,
            height: 25,
        },
        skeletonCardTitle: {
            width: '30%',
            height: 25,
            borderRadius: 5,
            backgroundColor: colors.skeletonColor
        },
        skeletonCardValue: {
            height: 25,
            borderRadius: 5,
            backgroundColor: colors.skeletonColor
        },
        skeletonCardDescription: {
            width: '25%',
            height: 25,
            borderRadius: 5,
            backgroundColor: colors.skeletonColor
        },
        floatingButton: {
            width: 70,
            height: 70,
            position: 'absolute',
            right: 25,
            bottom: 50,
            zIndex: 10,
            backgroundColor: colors.primaryColor,
            borderWidth: 1,
            // borderColor: 'white',
            borderRadius: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 3, // optional if you're targeting Android
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
        }
    });
}