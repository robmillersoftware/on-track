import { max, min } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { width, height } from './constants';

/**
 * Determines range of month indices to show on trend preview chart.
 * Will compute an appropriate 8-month interval.
 * @param {number} [month] Optional month (1-12) argument. Defaults to
 *  current month.
 * @return {Object} An object with `minMonth` and `maxMonth` numeric fields.
 */
export const monthRange = (month = (new Date().getMonth() + 1)) => ({
  minMonth: month < 8 ? 1 : month - 7,
  maxMonth: month < 8 ? 8 : month
});

/**
 * Helper function for creating y-axis scale for trend preview chart.
 * @param {Array} data The transformed trend `years` from which to compute
 *  the y scale.
 * @return {Function} A D3 linear scale function.
 */
export function yScale(data) {
  const _min = min(data,
    year => min(year.values,
      d => d.value));

  const _max = max(data,
    year => max(year.values,
      d => d.value));

  return scaleLinear()
    .domain([_min, _max])
    .range([height, 0]);
}


/**
 * Helper function for creating x-axis scale for trend preview chart.
 * @return {Function} A D3 linear scale function.
 */
export function xScale() {
  const { minMonth, maxMonth } = monthRange();

  return scaleLinear()
    .domain([minMonth, maxMonth])
    .range([0, width]);
}
