import { DateTime } from 'luxon';

export const DateFilter = (date) => {
  if (!date) return '';
  return DateTime.fromISO(date.split('T')[0]).toLocaleString(
    DateTime.DATETIME_FULL
  );
};
