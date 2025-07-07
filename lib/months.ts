import { HijriCalendarDay } from '../providers/CalendarProvider'

type HijriMonthWithGregorian = {
  number: number;
  en: string;
  ar: string;
  gregorian: string[];
};

export function extractHijriMonths(
  calendar: HijriCalendarDay[]
): HijriMonthWithGregorian[] {
  const monthMap = new Map<number, { en: string; ar: string; gregorian: Set<string> }>();

  for (const day of calendar) {
    const hijriMonth = day.hijri.month;
    const gregorianMonth = day.gregorian.month.en;

    if (!monthMap.has(hijriMonth.number)) {
      monthMap.set(hijriMonth.number, {
        en: hijriMonth.en,
        ar: hijriMonth.ar,
        gregorian: new Set()
      });
    }

    monthMap.get(hijriMonth.number)!.gregorian.add(gregorianMonth);
  }

  // Convert to desired array format
  const result: HijriMonthWithGregorian[] = Array.from(monthMap.entries()).map(
    ([number, { en, ar, gregorian }]) => ({
      number,
      en,
      ar,
      gregorian: Array.from(gregorian)
    })
  );

  // Optional: sort by Hijri month number
  result.sort((a, b) => a.number - b.number);

  return result;
}


