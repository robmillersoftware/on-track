import { monthRange } from './scales';

const { minMonth, maxMonth } = monthRange();

/**
 * Takes top 3 years, guards nulls with zeroes, filters against the
 *  month range computed by `monthRange`, maps to a simplified
 *  object model, filters out empty months, and reverses the list
 *  order so the svg shapes will be rendered with the correct z-order.
 * @param {Array} data The raw trend `years` data set.
 * @return {Array} The transformed and filtered `years` data set.
 */
export const transform = data =>
  data.sort((a, b) => b.year - a.year)
  .filter((d, i) => i < 3)
  .map(y => {
    const year = y.year;
    const values = y.months
      .map(m => ({
        month: m.month,
        value: m.actualNet || 0
      }))
      .filter(m => m.month >= minMonth && m.month <= maxMonth);
    return {
      year,
      values
    };
  })
  .filter(d => d.values.length > 0)
  .reverse();
