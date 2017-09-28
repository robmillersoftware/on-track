import { dateCompare } from './util';
import { today } from './constants';

export default class TodayPin {
  constructor(container, data) {
    this.container = container;
    this.data = data;
  }

  setScales(xScale, yScale) {
    this.xScale = xScale;
    this.yScale = yScale;
  }

  append() {
    // get x, y coords for today
    const { x, y } = this._getTodayCoords();

    this.today = this.container
      .append('g')
      .attr('class', 'today')
      .attr('transform', `translate(${x}, ${y})`);

    this.today.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 4.5);

    this.today.append('text')
      .attr('x', 7)
      .attr('y', -7)
      .text('Today');
  }

  resize() {
    const { x, y } = this._getTodayCoords();
    this.today
      .attr('transform', `translate(${x}, ${y})`);
  }

  _getTodayCoords() {
    return this.data
      .filter(d => dateCompare(d.date, today))
      .map(d => ({
        x: this.xScale(d.date),
        y: this.yScale(d.confirmed)
      }))
      .reduce((a, d) => d, null);
  }
}
