import BigCardSkeleton from '@/components/BigCardSkeleton';
import { extractWeekdays } from '@/lib/data';
import getStyles from '@/lib/styles';
import { useAppData } from '@/providers/AppDataProvider';
import { ScrollView, Text, View } from 'react-native';


export default function Learn() {
  const styles = getStyles()
  const { appData, loading } = useAppData();
  const islamicMonths = appData && appData.months
  const islamicWeekDays = appData && extractWeekdays(appData.calendar)

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Learn</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {
          loading ? (
            <BigCardSkeleton />
          ) : (
            <>
              <View style={styles.cardContainer}>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Islamic weekdays</Text>
                  <View style={styles.listContainer}>
                    {islamicWeekDays?.map((weekday, index) => (
                      <View style={styles.listItem} key={index}>
                        <View>
                          <Text style={styles.listItemTitle}>{weekday.hijri.en}</Text>
                          <Text style={styles.listItemDetail}>{weekday.gregorian.en}</Text>
                        </View>
                        <Text style={styles.arabic}>{weekday.hijri.ar}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              <View style={styles.cardContainer}>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Islamic months</Text>
                  <View style={styles.listContainer}>
                    {islamicMonths?.map((month, index) => (
                      <View style={styles.listItem} key={index}>
                        <Text style={styles.listItemTitle}>{month.number}, {month.en}</Text>
                        <Text style={styles.listItemSubTitle}>{month.ar}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </>
          )
        }
      </ScrollView>
    </View >
  );
}
