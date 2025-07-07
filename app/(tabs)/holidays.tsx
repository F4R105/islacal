import { getCurrentHijriMonthHolidays } from '@/lib/holidays';
import { useCalendar } from '@/providers/CalendarProvider';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextBase, useColorScheme, View } from 'react-native';


export default function Months() {
  const colorScheme = useColorScheme(); // 'light' or 'dark'
  const isDark = colorScheme === 'dark';
  const styles = createStyles(isDark);
  const { calendar } = useCalendar();
  const holidays = calendar && getCurrentHijriMonthHolidays(calendar);
  console.log(holidays)

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Holidays</Text>
        <View style={{flexDirection: 'row', gap: 4}}>
          <Text style={styles.subHeaderText}>{holidays?.month?.en} ({holidays?.month?.number}),</Text> 
          <Text style={styles.arabic}>{holidays?.month?.ar}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {holidays &&
          holidays.holidays.length > 0 && (
            holidays.holidays.map((holiday, index) => (
              <Text key={index}>{holiday}</Text>
            ))
          )}
        {/* {holidays && (
          {
            holidays.length > 0 && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Holidays</Text>
                {today.hijri.holidays.map((holiday, index) => (
                  <Text key={index} style={styles.holiday}>
                    - 🎉 {holiday}
                  </Text>
                ))}
              </View>
            )
          }
        )} */}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (isDark: boolean) => StyleSheet.create({
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
  arabic: {
    fontSize: 20,
    color: '#10b981',
    marginTop: 4,
    fontWeight: '600',
  },
  holiday: {
    fontSize: 22,
    fontWeight: '700',
    color: isDark ? '#e2e2e2' : '#111827',
  },
});
