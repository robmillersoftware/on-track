import { timeFormat } from 'd3-time-format';
import { line } from './primitives';
import { margin, height, axisHeight, defaults, numWeeks } from './constants';

export default class BottomAxis {
  constructor(container, data) {
    this.container = container;
    this.width = defaults.fullWidth - margin.left - margin.right;
    this.viewportSize = defaults.viewportSize;
    this.weeks = this._computeWeeks(data);
  }

  append() {
    this.lines = this.container
      .append('g')
      .attr('class', 'bottom-lines');

    this.lines
      .append('path')
      .datum(this._computeLines())
      .attr('d', line);

    this._drawLabels();
  }

  resize(width, viewportSize) {
    this.width = width;
    this.viewportSize = viewportSize;
    this.lines
      .select('path')
      .datum(this._computeLines())
      .attr('d', line);

    // update labels width and position
    const colWidth = this.width / this.viewportSize;
    const h = height + axisHeight - 12;
    this.container
      .selectAll('.bottom-label')
      .attr('width', colWidth)
      .attr('transform', (d, i) =>
        `translate(${i * colWidth + colWidth / 2}, ${h})`);
  }

  _computeLines() {
    // TODO: refactor and move
    const data = [];
    const colWidth = this.width / this.viewportSize;
    const h = height + axisHeight;

    for (let i = 0; i < numWeeks - 1; i++) {
      const x = colWidth * i;
      data.push({ x, y: h * 0.94 });
      data.push({ x, y: h });
      data.push({ x: x + colWidth, y: h });
    }

    data.push({
      x: (numWeeks - 1) * colWidth,
      y: h * 0.4
    });

    return data;
  }

  _computeWeeks(data) {
    // get weeks
    const weeks = [];
    for (let i = 0; i < data.length - 7; i += 7) {
      const start = data[i].date;
      const end = data[i + 6].date;
      weeks.push({
        start,
        end
      });
    }
    return weeks;
  }

  _drawLabels() {
    const formatTime = timeFormat('%b %e');
    const colWidth = this.width / this.viewportSize;
    const h = height + axisHeight - 12;

    this.labels = this.container
      .selectAll('.bottom-label')
      .data(this.weeks, d => d.start);

    this.labels
      .enter()
      .merge(this.labels)
      .append('g')
      .attr('class', 'bottom-label')
      .attr('width', colWidth)
      .attr('transform', (d, i) =>
        `translate(${i * colWidth + colWidth / 2}, ${h})`)
      .append('text')
      .text(d => `${formatTime(d.start)} - ${formatTime(d.end)}`);

    this.labels
      .exit()
      .remove();
  }
}
