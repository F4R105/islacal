import { HijriCalendarDay } from '../providers/CalendarProvider'

type HijriMonthDetails = {
  number: number;
  en: string;
  ar: string;
  year: string;
};

type HijriMonthHolidaysResult = {
  month: HijriMonthDetails | null;
  holidays: string[];
};

export function getCurrentHijriMonthHolidays(
  calendar: HijriCalendarDay[]
): HijriMonthHolidaysResult {

  // Step 1: Get today's Gregorian date in DD-MM-YYYY format
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${dd}-${mm}-${yyyy}`;
  

  // Step 2: Find the calendar entry for today
  const todayEntry = calendar.filter(day => day.gregorian.date === todayStr)[0];
  const currentHijriMonth = todayEntry.hijri.month.number;
  const currentHijriYear = todayEntry.hijri.year;

  const currentMonthDetails: HijriMonthDetails = {
    number: currentHijriMonth,
    en: todayEntry.hijri.month.en,
    ar: todayEntry.hijri.month.ar,
    year: currentHijriYear
  };

  // Step 3: Filter calendar to current Hijri month
  const currentMonthDays = calendar.filter(
    day =>
      day.hijri.month.number === currentHijriMonth &&
      day.hijri.year === currentHijriYear
  );

  // Step 4: Collect holidays and adjustedHolidays
  const holidays = new Set<string>();
  for (const day of currentMonthDays) {
    day.hijri.holidays.forEach(h => holidays.add(h));
    day.hijri.adjustedHolidays.forEach(h => holidays.add(h));
  }

  return {
    month: currentMonthDetails,
    holidays: Array.from(holidays)
  };
}

