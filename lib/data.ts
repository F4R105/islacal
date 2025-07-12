import { AppDataType, CalendarDay, CalendarMonth, HolidaysType, HolidayType, IslamicMonth, WeekdayType } from '@/lib/types';
import { API_BASE_URL } from "./config";
import formatDate from './date';

export async function getNewData(date: Date = new Date()): Promise<AppDataType> {
  const { month, year } = formatDate(date);

  try {
    const [monthlyCalendar, specialDays, islamicMonths] = await Promise.all([
      fetch(`${API_BASE_URL}/gToHCalendar/${month}/${year}&calender=MATHEMATICAL`),
      fetch(`${API_BASE_URL}/specialDays`),
      fetch(`${API_BASE_URL}/islamicMonths`),
    ]);

    const monthlyCal = await monthlyCalendar.json()
    const holidays = await specialDays.json()
    const months = await islamicMonths.json()

    // convert months format to arrays
    const monthsArray = (Object.values(months.data) as IslamicMonth[]).sort(
      (a, b) => a.number - b.number
    );

    return {
      calendar: monthlyCal.data,
      holidays: holidays.data,
      months: monthsArray
    }
  } catch (error) {
    throw new Error('Something went wrong while fetching new app data');
  }
}

export function extractDay(
  calendar: CalendarMonth,
  gregorianDate: Date = new Date()
): CalendarDay {
  const { fullDate } = formatDate(gregorianDate);
  return calendar?.filter(day => day.gregorian.date === fullDate)[0];
}

export function extractWeekdays(calendar: CalendarMonth): WeekdayType[] {
  const seen = new Map<string, WeekdayType>();

  for (const day of calendar) {
    if (!seen.has(day.gregorian.weekday.en)) {
      seen.set(day.gregorian.weekday.en, {
        hijri: {
          en: day.hijri.weekday.en,
          ar: day.hijri.weekday.ar
        },
        gregorian: {
          en: day.gregorian.weekday.en
        }
      });

      if (seen.size === 7) break; // Stop once we have all 7 days
    }
  }

  const weekdayOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  return weekdayOrder
    .map(day => seen.get(day))
    .filter((item): item is WeekdayType => item !== undefined);
}

export function extractMonthHolidays(
  holidays: HolidaysType,
  hijriMonth: number
): HolidayType[] {
  return holidays.filter(holiday => holiday.month === hijriMonth)
}

export function extractNextHoliday(
  holidays: HolidaysType,
  currentHijriMonth: number,
  currentHijriDay: number
): HolidayType | null {
  const sorted = holidays
    .slice()
    .sort((a, b) => a.month === b.month
      ? a.day - b.day
      : a.month - b.month
    );

  for (const holiday of sorted) {
    if (
      holiday.month > currentHijriMonth ||
      (holiday.month === currentHijriMonth && holiday.day > currentHijriDay)
    ) {
      return holiday;
    }
  }

  return null

}

export async function fetchCalendarDayFromGregorianDate(gregorianDate: Date = new Date()): Promise<CalendarDay> {
  const { fullDate } = formatDate(gregorianDate);
  const response = await fetch(`${API_BASE_URL}/gToH/${fullDate}`)
  const calendar = await response.json()
  return calendar.data
}