import { select } from 'd3-selection';
import { extent } from 'd3-array';
import { timeParse, timeFormat } from 'd3-time-format';
import { axisBottom, axisLeft } from 'd3-axis';
import { format } from 'd3-format';
import { scaleLinear, scaleTime } from 'd3-scale';
import { area } from 'd3-shape';
import { width, height, margin } from './constants';
import testData from './test-data.json';

const parseTime = timeParse('%d-%b-%y');

export default class CashflowPreviewController {
  constructor($element) {
    'ngInject';
    this.$element = $element;
  }

  $onInit() {
    this.containerElement = this.$element.find('div')[0];
    // TODO: wire-up the cashflow backend and domain service and
    // delete this temporary code
    this.cashflow = testData.map(d => ({
      date: parseTime(d.date),
      confirmed: d.confirmed,
      forecast: d.forecast
    }));
    this.setup();
  }

  $postLink() {
    this.render();
  }

  $onChanges(changes) {
    if (changes.cashflow && this.containerElement) {
      this.render();
    }
  }

  setup() {
    this.forecast = this.cashflow.filter(d => d.forecast);
    const confirmedExtent = extent(this.cashflow, d => d.confirmed);
    const forecastExtent = extent(this.forecast, d => d.forecast);
    const yExtent = extent(confirmedExtent.concat(forecastExtent));

    // pad bottom with size of extent
    yExtent[0] -= (yExtent[1] - yExtent[0]) * 0.3;

    this.xScale = scaleTime()
      .domain(extent(this.cashflow, d => d.date))
      .range([0, width]);

    this.yScale = scaleLinear()
      .domain(yExtent)
      .range([height, 0]);

    const yMin = this.yScale(yExtent[0]);

    this.confirmedArea = area()
        .x(d => this.xScale(d.date))
        .y0(yMin)
        .y1(d => this.yScale(d.confirmed));

    this.unconfirmedArea = area()
        .x(d => this.xScale(d.date))
        .y0(yMin)
        .y1(d => this.yScale(d.forecast));

    this.svg = select(this.containerElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  }

  render() {
    const g = this.svg
      .append('g');

    g.append('path')
      .datum(this.forecast)
      .attr('class', 'area-forecast')
      .attr('d', this.unconfirmedArea);

    g.append('path')
      .datum(this.cashflow)
      .attr('class', 'area-confirmed')
      .attr('d', this.confirmedArea);

    // draw the "today" dot
    // TODO: derive from data
    const x = this.xScale(new Date('1-Jul-17'));
    const y = this.yScale(this.forecast[0].forecast);
    const dot = g.append('g')
      .attr('transform',
        `translate(${x}, ${y})`);

    dot.append('circle')
      .attr('r', 3)
      .attr('class', 'circle-today');

    dot.append('text')
      .text('Today')
      .attr('class', 'label-today')
      .attr('y', -10);

    const bottomAxis = axisBottom(this.xScale)
      .tickValues(this.xScale.domain())
      .tickFormat(timeFormat('%b %e'))
      .tickSize(10)
      .tickPadding(10);

    const leftAxis = axisLeft(this.yScale)
      .tickValues(this.yScale.domain())
      .tickFormat(format('$,.0f'));

    g.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(bottomAxis)
      .attr('class', 'bottom-axis');

    g.append('g')
      .call(leftAxis);
  }
}
