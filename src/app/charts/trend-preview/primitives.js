import { select } from 'd3-selection';
import { colors } from './constants';
import { line } from 'd3-shape';

/**
 * Helper function that draws colored line for values the over a
 * given year.
 * @param {Object} data The year data passed in by D3.
 * @param {number} i The year index provided by D3.
 * @param {Array} elements All the elements in the current
 *  selection provided by D3.
 * @param {Object} scales The scaling functions on an object literal that
 *  must be passed in manually.
 */
export const renderLines = (data, i, elements, scales) => {
  const _line = line()
    .x(d => scales.x(d.month))
    .y(d => scales.y(d.value));

  const color = colors[i];

  return select(elements[i])
    .append('path')
    .attr('d', d => _line(d.values))
    .style('stroke-width', 2)
    .style('stroke', color.stroke)
    .style('fill', 'none');
};

/**
 * Helper function that plots points for the values the over a
 * given year.
 * @param {Object} data The year data passed in by D3.
 * @param {number} i The year index provided by D3.
 * @param {Array} elements All the elements in the current
 *  selection provided by D3.
 * @param {Object} scales The scaling functions on an object literal that
 *  must be passed in manually.
 */
export const renderPoints = (data, i, elements, scales) => {
  const color = colors[i];

  return select(elements[i])
    .selectAll('circle')
    .data(data.values)
    .enter()
    .append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('fill', color.fill)
    .attr('stroke', color.stroke)
    .attr('stroke-width', 1)
    .attr('transform', d =>
      `translate(${scales.x(d.month)}, ${scales.y(d.value)})`)
    .attr('r', 6);
};

/**
 * The `d` values of an SVG `path` that encode the checkbox icon.
 */
const checkbox = 'M924.7,10H75.3C39.2,10,10,39.2,10,75.3v849.3c0,36.1,29.2,' +
  '65.3,65.3,65.3h849.3c36.1,0,65.3-29.2,65.3-65.3V75.3C990,39.2,960.8,10,' +
  '924.7,10z M407.1,765.4L141.5,504.9l81.7-80.5l182.8,180l371.7-365.9l81.7,' +
  '80.4L407.1,765.4z';

/**
 * Helper function that draws checkbox and colored label for each
 * year represented in the chart.
 * @param {Object} data The year data passed in by D3.
 * @param {number} i The year index provided by D3.
 * @param {Array} elements All the elements in the current
 *  selection provided by D3.
 */
export const checkboxLabel = (data, i, elements) => {
  const color = colors[i];
  const container = select(elements[i]);

  const icon = container
    .append('svg')
    .attr('x', 0)
    .attr('y', 0)
    .attr('viewBox', '0 0 1000 1000')
    .attr('width', 20)
    .attr('height', 20)
    .style('opacity', 0.2);

  icon
    .append('g')
    .append('path')
    .attr('d', checkbox);

  container
    .append('text')
    .text(`${data.year}`)
    .style('font-weight', 'bold')
    .style('fill', `${color.stroke}`)
    .attr('transform', 'translate(26, 16)');

  container
    .attr('transform', `translate(${80 * i}, -75)`);

  return this;
};
