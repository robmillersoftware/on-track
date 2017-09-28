import { area } from 'd3-shape';
import { today } from './constants';

export default class Areas {
  constructor(container, data) {
    this.container = container;
    this.data = data;
  }

  setScales(xScale, yScale) {
    const yMin = yScale.domain()[0];

    this.confirmedArea = area()
      .x(d => xScale(d.date))
      .y1(d => yScale(d.confirmed))
      .y0(yScale(yMin));

    this.unconfirmedArea = area()
      .x(d => xScale(d.date))
      .y1(d => yScale(d.unconfirmed))
      .y0(yScale(yMin));
  }

  append() {
    // append unconfirmed area
    this.container
      .append('path')
      .datum(this.data
        .filter(d =>
          d.date >= today))
      .attr('class', 'unconfirmed')
      .attr('d', this.unconfirmedArea);

    // append confirmed area
    this.container
      .append('path')
      .datum(this.data)
      .attr('class', 'confirmed')
      .attr('d', this.confirmedArea);
  }

  resize() {
    // update areas
    this.container
      .select('.unconfirmed')
      .attr('d', this.unconfirmedArea);

    this.container
      .select('.confirmed')
      .attr('d', this.confirmedArea);
  }
}
