import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import getStyles, { getColors } from '@/lib/styles';

export default function NotFoundScreen() {
    const { message } = useLocalSearchParams<{ message?: string }>();
    const styles = getStyles()
    const colors = getColors()

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={[styles.wrapper, { flex: 1, alignItems: 'center' }]}>
                <View style={[styles.container, { maxWidth: 350, marginTop: 80, gap: 30, alignItems: 'center', paddingHorizontal: 20 }]}>
                    <View style={{alignItems: 'center', gap: 10}}>
                        <MaterialIcons name="error-outline" size={50} color={colors.failure} />
                    </View>

                    <Text style={{ fontSize: 20, color: colors.failure, textAlign: 'center', marginBottom: 30 }}>
                        {message ?? 'Unknown error has occurred.'}
                    </Text>

                    <Text style={{ fontSize: 15, color: 'grey', textAlign: 'center', lineHeight: 22 }}>
                        Please ensure your device has an active internet connection.{"\n"}
                        If the issue persists despite a stable network, feel free to reach out for support — we're here to help.
                    </Text>

                    <View style={{ marginTop: 30, padding: 15, backgroundColor: colors.foregroundColor, borderRadius: 8 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.textColor, marginBottom: 10 }}>
                            📞 Reach out
                        </Text>
                        <Text style={{ fontSize: 14, color: colors.textColor, marginBottom: 5 }}>
                            Email: <Text style={{ color: colors.primaryColor }}>support@islacal.app</Text>
                        </Text>
                        <Text style={{ fontSize: 14, color: colors.textColor, marginBottom: 5 }}>
                            WhatsApp: <Text style={{ color: colors.primaryColor }}>+255 764 765 671</Text>
                        </Text>
                        <Text style={{ fontSize: 14, color: colors.textColor }}>
                            GitHub: <Text style={{ color: colors.primaryColor }}>github.com/F4R105/islacal/issues</Text>
                        </Text>
                    </View>

                    <Link href="/" style={{ backgroundColor: colors.primaryColor, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 }}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Go to home screen</Text>
                    </Link>
                </View>
            </View>

        </>
    );
}
