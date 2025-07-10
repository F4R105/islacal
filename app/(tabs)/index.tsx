import CardListSkeleton from '@/components/CardListSkeleton';
import { extractDay, extractNextHoliday } from '@/lib/data';
import getStyles from '@/lib/styles';
import { useAppData } from '@/providers/AppDataProvider';
import { ScrollView, Text, View } from 'react-native';


export default function HomeScreen() {
  const styles = getStyles();

  const { appData, loading } = useAppData();
  const today = appData && extractDay(appData.calendar)
  const nextHoliday = today && extractNextHoliday(appData?.holidays, today.hijri.month.number, parseInt(today.hijri.day))

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}> Today’s Hijri Date</Text>
        <Text style={[styles.info, {textAlign: 'right'}]}>
          {
            today ? (
              <>
                {today.gregorian.weekday.en},
                {today.gregorian.day}-{today.gregorian.month.number}-{today.gregorian.year}
              </>
            ) : (
              <>
              Current day...
              </>
            )
          }
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {today && (
          <View style={styles.cardContainer}>
            {
              loading ? (
                <CardListSkeleton />
              ) : (
                <>
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
                </>
              )
            }
          </View>
        )
        }

        {
          nextHoliday && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Next Holiday</Text>
              <Text style={styles.cardValue}>
                {nextHoliday.name}
              </Text>
              <Text style={styles.info}>Day {nextHoliday.day} {nextHoliday.month > today?.hijri.month.number && 'Next month'}</Text>
            </View>
          )
        }
      </ScrollView >
    </View >
  );
}


