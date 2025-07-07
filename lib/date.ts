type currentDateType = {
    day: string,
    month: string,
    year: string,
    date: string
}

export default function getCurrentDate(): currentDateType {
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const date = `${day}-${month}-${year}`;

  return {
    day, month, year, date
  }
}