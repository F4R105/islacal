import { CurrentMonthCalendar, HijriCalendarDay } from "@/providers/CalendarProvider";
import getCurrentDate from "./date";

export function extractCurrentDay(calendar: CurrentMonthCalendar) : HijriCalendarDay {
    const { date } = getCurrentDate();
    return calendar?.filter(day => day.gregorian.date === date)[0];
}

export function extractMonths(calendar: CurrentMonthCalendar) {

}

export function extractWeekdays(calendar: CurrentMonthCalendar) {

}

export function extractCurrentMonthHolidays(calendar: CurrentMonthCalendar) {

}