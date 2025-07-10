export type DateType = {
  day: number,
  month: number,
  year: number,
  fullDate: string
}

export default function formatDate(gregorianDate: Date = new Date()): DateType {
  const year = gregorianDate.getFullYear().toString();
  const month = String(gregorianDate.getMonth() + 1).padStart(2, '0');
  const day = String(gregorianDate.getDate()).padStart(2, '0');
  const fullDate = `${day}-${month}-${year}`;

  return {
    day: parseInt(day),
    month: parseInt(month),
    year: parseInt(year),
    fullDate
  }
}