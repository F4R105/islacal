// import { getCurrentHijriMonthHolidays } from '@/lib/holidays';
import { extractCurrentDay, extractCurrentMonthHolidays } from '@/lib/data';
import getStyles from '@/lib/styles';
import { useAppData } from '@/providers/AppDataProvider';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';


export default function Months() {
  const styles = getStyles()
  const { appData } = useAppData();
  const currentDay = appData && extractCurrentDay(appData.calendar)
  const holidays = currentDay && extractCurrentMonthHolidays(appData.holidays, currentDay.hijri.month.number)

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.headerText}>{currentDay && currentDay.hijri.month.en}, {currentDay && currentDay.hijri.day}</Text>
        <Text style={styles.subHeaderText}>
          {holidays && holidays.length} Holidays
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {holidays && holidays.length > 0 && (
          <View style={styles.cardContainer}>
            {holidays.map((holiday, index) => (
              <View style={styles.card} key={index}>
                <Text style={styles.cardTitle}>Day {holiday.day}</Text>
                <Text style={styles.cardValue}>
                  {holiday.name}
                </Text>
                <View>
                  {parseInt(currentDay.hijri.day) > holiday.day ? (
                    <Text style={styles.failure}>Passed</Text>
                  ) : (
                    <Text style={styles.success}>Coming</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
