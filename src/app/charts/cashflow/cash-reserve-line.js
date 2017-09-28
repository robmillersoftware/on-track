import { margin, numWeeks, defaults } from './constants';

export default class CashReserveLine {
  constructor(container, clipId = 'shortfall-clip') {
    this.container = container;
    this.clipId = clipId;
    this.width = defaults.fullWidth - margin.left - margin.right;
    this.viewportSize = defaults.viewportSize;
  }

  append() {
    // parent `g` needed for clipping
    this.g = this.container
      .append('g');
    this.shortfall = this.g
      .append('g');
    this.reserve = this.g
      .append('g');

    const w = numWeeks * this.width / this.viewportSize;

    // draw shortfall line below/behind
    this.shortfall
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', w)
      .attr('y2', 0)
      .attr('class', 'shortfall');

    // draw the cash reserve line
    this.reserve
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', w)
      .attr('y2', 0)
      .attr('class', 'cash-reserve');

    this.reserve
      .attr('clip-path', `url(#${this.clipId})`);
  }

  resize(width, viewportSize) {
    this.width = width;
    this.viewportSize = viewportSize;
    const w = numWeeks * this.width / this.viewportSize;

    this.shortfall
      .select('line')
      .attr('x2', w);
    this.reserve
      .select('line')
      .attr('x2', w);
  }

  move(y) {
    this.g
      .selectAll('line')
      .attr('y1', y)
      .attr('y2', y);
  }
}
