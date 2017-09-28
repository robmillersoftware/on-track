import { format } from 'd3-format';
import { height } from './constants';

export const yAxis = (yMin, yMax, container) =>
  container
    .append('g')
    .selectAll('text')
    .data([yMax, yMin])
    .enter()
    .append('text')
    .text(d => format('$,.0f')(d))
    .attr('x', -16)
    .attr('y', (d, i) => height * i + (i === 0 ? 10 : 0))
    .attr('class', 'left-label');
