import { AppDataType, CurrentMonthCalendar, HijriCalendarDay, HolidaysType, HolidayType, IslamicMonth, WeekdayType } from '@/lib/types';
import getCurrentDate from "./date";
import { API_BASE_URL } from "./config";

const { day, month, year, date } = getCurrentDate();

export async function getNewData(): Promise<AppDataType> {
  const [monthlyCalendar, specialDays, islamicMonths] = await Promise.all([
    fetch(`${API_BASE_URL}/gToHCalendar/${month}/${year}`),
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
}

export function extractCurrentDay(calendar: CurrentMonthCalendar): HijriCalendarDay {
  return calendar?.filter(day => day.gregorian.date === date)[0];
}

export function extractWeekdays(calendar: CurrentMonthCalendar): WeekdayType[] {
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

export function extractCurrentMonthHolidays(
  holidays: HolidaysType,
  hijriDay: number
): HolidayType[] 
{
  return holidays.filter(holiday => holiday.month === hijriDay)
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