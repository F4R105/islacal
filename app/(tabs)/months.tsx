import { useCalendar } from '@/providers/CalendarProvider';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextBase, useColorScheme, View } from 'react-native';


export default function Months() {


  return (
    <SafeAreaView>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}> Today’s Hijri Date</Text>
        <Text style={styles.subHeaderText}>
          {today?.hijri.day}-{today?.hijri.month.number}, {today?.hijri.year}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {today && (
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Day {today.hijri.holidays.length > 0 && <>(✨'<Text style={styles.cardSubtitle}>{today.hijri.holidays[0]}</Text>)</>}</Text>
              <Text style={styles.cardValue}>
                {today.hijri.day}, {today.hijri.weekday.en}
              </Text>
              <Text style={styles.arabic}>{today.hijri.weekday.ar}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Month <Text style={styles.cardSubtitle}>({today.hijri.month.days} days)</Text></Text>
              <Text style={styles.cardValue}>
                {today.hijri.month.en} ({today.hijri.month.number})
              </Text>
              <Text style={styles.arabic}>{today.hijri.month.ar}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Year</Text>
              <Text style={styles.cardValue}>{today.hijri.year}</Text>
            </View>

            {today.hijri.holidays.length > 0 && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Holidays</Text>
                {today.hijri.holidays.map((holiday, index) => (
                    <Text key={index} style={styles.holiday}>
                      - 🎉 {holiday}
                    </Text>
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView> */}
    </SafeAreaView>
  );
}
