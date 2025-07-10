export type CalendarDay = {
  hijri: {
    date: string;
    format: string;
    day: string;
    weekday: { en: string; ar: string };
    month: { number: number; en: string; ar: string; days: number };
    year: string;
    designation: { abbreviated: string; expanded: string };
    holidays: string[];
    adjustedHolidays: string[];
    method: string;
  };
  gregorian: {
    date: string;
    format: string;
    day: string;
    weekday: { en: string };
    month: { number: number; en: string };
    year: string;
    designation: { abbreviated: string; expanded: string };
    lunarSighting: boolean;
  };
};

export type IslamicMonth = {
  number: number;
  en: string;
  ar: string;
};

export type HolidayType = {
  month: number;
  day: number;
  name: string;
};

export type WeekdayType = {
  hijri: {
    en: string;
    ar: string;
  };
  gregorian: {
    en: string;
  };
};

export type CalendarMonth = CalendarDay[];
export type IslamicMonths = IslamicMonth[];
export type HolidaysType = HolidayType[];


export type AppDataType = {
  calendar: CalendarMonth,
  holidays: HolidaysType,
  months: IslamicMonths
}