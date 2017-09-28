import { min } from 'd3-array';
import { select } from 'd3-selection';
import { area } from 'd3-shape';
import { margin, fullHeight, today } from './constants';

export default class CashReserveClip {
  constructor(svg, data, id = 'shortfall-clip') {
    this.svg = svg;
    this.data = data;
    this.id = id;
  }

  setScales(xScale, yScale) {
    this.xScale = xScale;
    this.yScale = yScale;
  }

  append() {
    const yMin = min(this.data,
      d => Math.min(d.confirmed, d.unconfirmed));

    // create clipPath
    const clipPath = this.svg
      .append('clipPath')
      .attr('id', this.id);

    const clipData = this.data
      .filter(d => d.date >= today);

    const clipArea1 = area()
      .x(d => this.xScale(d.date))
      .y1(d => this.yScale(d.confirmed))
      .y0(this.yScale(yMin));

    const clipArea2 = area()
      .x(d => this.xScale(d.date))
      .y1(d => this.yScale(d.unconfirmed))
      .y0(this.yScale(yMin));

    clipPath
      .append('path')
      .datum(clipData)
      .attr('d', clipArea1);

    clipPath
      .append('path')
      .datum(clipData)
      .attr('d', clipArea2);

    clipPath
      .append('rect')
      .attr('x', 0)
      .attr('y', -margin.top)
      .attr('width', this.xScale(today))
      .attr('height', fullHeight);
  }

  resize() {
    select(`#${this.id}`).remove();
    this.append();
  }
}
