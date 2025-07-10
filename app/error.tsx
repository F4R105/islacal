import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import getStyles, { getColors } from '@/lib/styles';

export default function NotFoundScreen() {
    const { message } = useLocalSearchParams<{ message?: string }>();
    const styles = getStyles()
    const colors = getColors()

    return (
        <>
            <Stack.Screen options={{ title: 'Oops!', headerShown: false }} />
            <View style={[styles.wrapper, {alignItems: 'center'} ]}>
                <View style={[styles.container, {height: '100%', alignItems: 'center', paddingTop: 200}]}>
                    <Text style={{fontSize: 30, fontWeight: 'bold', color: colors.failure}}>Error</Text>
                    <Text style={{fontSize: 20, color: colors.textColor}}>{message ?? 'Unknown error occurred.'}</Text>
                    <Link href="/" style={[{marginTop: 40, color: colors.primaryColor}]}>
                        <Text>Go to home screen!</Text>
                    </Link>
                </View>
            </View>
        </>
    );
}
