import { extractWeekdays } from '@/lib/data';
import getStyles from '@/lib/styles';
import { useAppData } from '@/providers/AppDataProvider';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';


export default function Learn() {
  const styles = getStyles()
  const { appData } = useAppData();
  const islamicMonths = appData && appData.months
  const islamicWeekDays = appData && extractWeekdays(appData.calendar)

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Learn</Text>
        <Text style={styles.subHeaderText}>
          Islamic calendar
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Islamic weekdays</Text>
            <View style={styles.listContainer}>
              {islamicWeekDays?.map(weekday => (
                <View style={styles.listItem}>
                  <View>
                    <Text style={styles.listItemTitle}>{weekday.hijri.en}</Text>
                    <Text style={styles.listItemDetail}>{weekday.gregorian.en}</Text>
                  </View>
                  <Text style={styles.listItemSubTitle}>{weekday.hijri.ar}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Islamic months</Text>
            <View style={styles.listContainer}>
              {islamicMonths?.map(month => (
                <View style={styles.listItem}>
                  <Text style={styles.listItemTitle}>{month.number}, {month.en}</Text>
                  <Text style={styles.listItemSubTitle}>{month.ar}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}
