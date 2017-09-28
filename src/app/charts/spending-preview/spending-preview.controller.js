import { select } from 'd3-selection';
import { max } from 'd3-array';
import { format } from 'd3-format';
import { scaleLinear, scaleBand } from 'd3-scale';
import { width, height, margin } from './constants';

export default class SpendingPreviewController {
  constructor($element) {
    'ngInject';
    this.$element = $element;
  }

  $onInit() {
    this.containerElement = this.$element.find('div')[0];
    this.setup();
  }

  $postLink() {
    this.render();
  }

  $onChanges(changes) {
    if (changes.totals && this.containerElement) {
      this.render();
    }
  }

  setup() {
    const maxAmount = max(this.totals, d => d.amount);
    const maxPercent = max(this.totals, d => d.percent);

    this.bottomTicks = this.computeTicks(maxAmount);
    this.topTicks = this.computeTicks(maxPercent);

    this.xScale = scaleLinear()
      .domain([0, maxAmount])
      .range([0, width]);

    this.yScale = scaleBand()
      .padding(0.2)
      .domain(this.totals.map(d => d.category))
      .range([0, height]);

    this.topScale = scaleLinear()
      .domain([0, maxPercent])
      .range([0, width]);

    this.svg = select(this.containerElement)
      .append('svg')
      .attr('width', width * 2 + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    this.leftCol = this.svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    this.rightCol = this.svg
      .append('g')
      .attr('transform', `translate(${width + margin.left}, ${margin.top})`);
  }

  render() {
    // draw labels
    const leftCol = this.leftCol
      .append('g')
      .selectAll('text')
      .data(this.totals)
      .enter();
    this.buildLabels(leftCol);

    // draw bars
    this.rightCol
      .append('g')
      .selectAll('rect')
      .data(this.totals)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('y', d => this.yScale(d.category))
      .attr('width', d => this.xScale(d.amount))
      .attr('height', this.yScale.bandwidth());

    // draw axes
    this.buildTopAxis(this.topTicks, this.topScale);
    this.buildBottomAxis(this.bottomTicks, this.xScale);
  }

  buildLabels(container) {
    // category label
    container.append('text')
      .text(d => d.category)
      .attr('class', 'category-label')
      .attr('x', 0)
      .attr('y', d => 17 + this.yScale(d.category));

    // amount - percent label
    container.append('text')
      .text(d =>
        `${format('$,.0f')(d.amount)} - ${format('.0%')(d.percent / 100)}`)
      .attr('class', 'category-amount')
      .attr('x', 0)
      .attr('y', d => 38 + this.yScale(d.category));
  }

  computeTicks(maxValue) {
    return [
      0,
      Math.round(maxValue * 0.5),
      maxValue];
  }

  buildTopAxis(values, scale) {
    const enter = this.rightCol
      .append('g')
      .attr('class', 'axis')
      .selectAll('text')
      .data(values)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${scale(d)}, 0)`);

    enter.append('text')
      .text(d => format('.0%')(d / 100))
      .attr('x', 0)
      .attr('y', 0)
      .attr('dy', '0.1em');
  }

  buildBottomAxis(values, scale) {
    this.rightCol
      .append('g')
      .attr('class', 'axis')
      .selectAll('g')
      .data(values)
      .enter()
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .append('text')
      .text(d => format('$,.0f')(d))
      .attr('x', d => scale(d))
      .attr('y', 0)
      .attr('dy', '0.7em');
  }
}
