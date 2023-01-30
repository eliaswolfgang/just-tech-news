import { DateTime } from 'luxon';

export const DateFilter = (date) => {
  if (!date) return '';
  return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_FULL);
};
