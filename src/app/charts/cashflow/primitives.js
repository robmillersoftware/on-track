import { line as _line } from 'd3-shape';

export const line = _line()
  .x(d => d.x)
  .y(d => d.y);

export const triangle = (container, width = 12, height = 12) => {
  const path = [
    { x: width / 2, y: 0 },
    { x: 0, y: height },
    { x: width, y: height },
    { x: width / 2, y: 0 }
  ];
  return container
    .append('path')
    .datum(path)
    .attr('d', line)
    .attr('stroke-width', 2)
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round');
};
