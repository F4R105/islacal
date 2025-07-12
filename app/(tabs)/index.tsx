import CalendarDayDetailsCards from '@/components/CalendarDayDetailsCards';
import Ionicons from '@expo/vector-icons/Ionicons';
import CardListSkeleton from '@/components/CardListSkeleton';
import { extractDay, extractNextHoliday } from '@/lib/data';
import { useAppData } from '@/providers/AppDataProvider';
import { ScrollView, Text, TouchableOpacity, View, Animated, Easing } from 'react-native';
import getStyles, { getColors } from '@/lib/styles';
import { useEffect, useRef } from 'react';
import { router } from 'expo-router';

export default function HomeScreen() {
  const styles = getStyles();
  const spinAnim = useRef(new Animated.Value(0)).current;

  const { appData, loading, refresh } = useAppData();
  const today = appData && extractDay(appData.calendar);
  const nextHoliday = today && extractNextHoliday(appData?.holidays, today.hijri.month.number, parseInt(today.hijri.day));

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinAnim.stopAnimation();
      spinAnim.setValue(0); // Reset rotation
    }
  }, [loading]);

  return (
    <View style={styles.wrapper}>
      <View style={[styles.header, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
        <View>
          <Text style={styles.headerText}> Today’s Hijri Date</Text>
          <Text style={[styles.info, { marginLeft: 7 }]}>
            {
              today ? (
                <>
                  {today.gregorian.weekday.en},
                  {today.gregorian.day}-{today.gregorian.month.number}-{today.gregorian.year}
                </>
              ) : (
                <>
                  Loading current day...
                </>
              )
            }
          </Text>
        </View>
        {/* <TouchableOpacity onPress={() => refresh()} style={{ marginRight: 10 }}> */}
        <TouchableOpacity onPress={() => router.push('/+not-found')} style={{ marginRight: 10 }}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <Ionicons name="refresh-circle" size={35} color={getColors().primaryColor} />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardContainer}>
          {loading ? (
            <CardListSkeleton />
          ) : (
            today && (
              <>
                <CalendarDayDetailsCards calendarDay={today} />
                {nextHoliday && (
                  <View style={styles.card}>
                    <Text style={styles.cardTitle}>Next Holiday</Text>
                    <Text style={styles.cardValue}>
                      {nextHoliday.name}
                    </Text>
                    <Text style={styles.info}>Day {nextHoliday.day} {nextHoliday.month > today?.hijri.month.number && 'Next month'}</Text>
                  </View>
                )}
              </>
            )
          )}
        </View>
      </ScrollView >
    </View >
  );
}


