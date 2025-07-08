// import { getCurrentHijriMonthHolidays } from '@/lib/holidays';
import { extractCurrentDay, extractCurrentMonthHolidays, extractNextHoliday } from '@/lib/data';
import getStyles from '@/lib/styles';
import { useAppData } from '@/providers/AppDataProvider';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';


export default function Months() {
  const styles = getStyles()
  const { appData } = useAppData()
  const today = appData && extractCurrentDay(appData.calendar)
  const holidays = today && extractCurrentMonthHolidays(appData.holidays, today.hijri.month.number)
  const nextHoliday = today && extractNextHoliday(appData?.holidays, today.hijri.month.number, parseInt(today.hijri.day))


  return (
    <SafeAreaView style={styles.wrapper}>
      {/* <View style={[styles.header, {marginBottom: 0}]}>
        <Text style={styles.headerText}>
          Holidays
        </Text>
        <Text style={styles.subHeaderText}>
          <Text>{today && today.hijri.month.en} </Text>
          <Text style={{ fontStyle: 'italic', fontSize: 15, color: 'gray' }}>({holidays && holidays.length} Holidays)</Text>
        </Text>
      </View> */}

      {nextHoliday && (
        <View style={{ paddingHorizontal: 15, alignItems: 'flex-end' }}>
          <Text style={styles.info}>Next Holiday, Day {nextHoliday.day} {nextHoliday.month > today?.hijri.month.number && 'Next month'}</Text>
          <Text style={styles.text}>{nextHoliday.name}</Text>
        </View>
      )}

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
                  {parseInt(today.hijri.day) > holiday.day ? (
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
