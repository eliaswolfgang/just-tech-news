import { DateTime } from 'luxon';

export const DateFilter = (date) => {
  if (!date) return '';
  if (date.includes('T')) {
    return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_FULL);
  } else {
    return DateTime.fromMillis(parseInt(date)).toLocaleString(
      DateTime.DATETIME_FULL
    );
  }
};
