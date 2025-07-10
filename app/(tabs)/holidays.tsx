// import { getCurrentHijriMonthHolidays } from '@/lib/holidays';
import CardListSkeleton from '@/components/CardListSkeleton';
import { extractDay, extractMonthHolidays, extractNextHoliday } from '@/lib/data';
import getStyles, { getColors } from '@/lib/styles';
import { useAppData } from '@/providers/AppDataProvider';
import { ScrollView, Text, View } from 'react-native';


export default function Months() {
  const styles = getStyles()
  const { appData, loading } = useAppData()
  const today = appData && extractDay(appData.calendar)
  const holidays = today && extractMonthHolidays(appData.holidays, today.hijri.month.number)
  const nextHoliday = today && extractNextHoliday(appData?.holidays, today.hijri.month.number, parseInt(today.hijri.day))

  return (
    <View style={styles.wrapper}>
      <View style={[styles.header, { marginBottom: 0 }]}>
        <Text style={styles.headerText}>
          {today ? today.hijri.month.en : 'Current month'} Holidays
        </Text>
      </View>

      {nextHoliday && (
        <View style={{ paddingHorizontal: 15, alignItems: 'flex-end' }}>
          <Text style={styles.info}>Next Holiday, Day {loading ? '...' : nextHoliday.day} {nextHoliday.month > today?.hijri.month.number && 'Next month'}</Text>
          <Text style={{ color: getColors().textColor }}>{loading ? 'Loading Coming Holiday..' : nextHoliday.name}</Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.container}>
        {holidays && holidays.length > 0 && (
          <View style={styles.cardContainer}>
            {
              loading ? (
                <CardListSkeleton />
              ) : (
                <>
                  {holidays.map((holiday, index) => (
                    <View style={styles.card} key={index}>
                      <Text style={styles.cardTitle}>Day {holiday.day}</Text>
                      <Text style={styles.cardValue}>
                        {holiday.name}
                      </Text>
                      <View>
                        {parseInt(today.hijri.day) === holiday.day ? (
                          <Text style={[styles.info, { color: getColors().success }]}>Today</Text>
                        ) : (
                          <>
                            {parseInt(today.hijri.day) > holiday.day ? (
                              <Text style={[styles.info, { color: getColors().info }]}>Passed</Text>
                            ) : (
                              <Text style={[styles.info, { color: getColors().textColor }]}>Coming..</Text>
                            )}
                          </>
                        )}
                      </View>
                    </View>
                  ))}
                </>
              )
            }

          </View>
        )}
      </ScrollView>
    </View>
  );
}
