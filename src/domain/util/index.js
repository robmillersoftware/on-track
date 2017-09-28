/**
 */
export const now = () => (new Date()).valueOf();

/**
 * TODO: determine date format returned by backend and write proper converter
 */
export const epochToDate = ms => new Date(ms);

/**
 */
export const accountDisplayMask = maskedNumber =>
  maskedNumber.replace(/(X)\1{4,}/, 'x');

/**
 * Gets a `yearMonth` string from a numeric year and month.
 * @param {number} y The year argument.
 * @param {number} m The month argument.
 * @return {string} A string in `yyyymm` format.
 */
export const toYearMonth = (y, m) => {
  const month = m < 10 ? `0${m}` : m;
  return `${y}${month}`;
};

/**
 * Gets a `yearMonth` string from a JS `Date` object.
 * @param {Date} d A JavaScript Date object.
 * @return {string} A string in `yyyymm` format.
 */
export const yearMonthFromDate = d =>
  toYearMonth(d.getFullYear(), d.getMonth() + 1);
