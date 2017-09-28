import { select } from 'd3-selection';
import { format } from 'd3-format';
import { axisBottom } from 'd3-axis';
import { height, fullWidth, fullHeight, margin } from './constants';
import { xScale, yScale } from './scales';
import { renderLines, renderPoints, checkboxLabel } from './primitives';
import { transform } from './data-transform';

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
    if (changes.years && this.containerElement) {
      this.render();
    }
  }

  /**
   * Transforms the trend `years` data, builds the x and y scales,
   * and sets up the container `svg` element.
   */
  setup() {
    // transform the trend data so it's simpler to work with
    this.years = transform(this.years);

    if (this.years.length === 0) {
      // no data! disable chart and show 'no data' state.
      this.empty = true;
      return;
    }

    this.xScale = xScale(this.years);
    this.yScale = yScale(this.years);

    this.svg = select(this.containerElement)
      .append('svg')
      .attr('width', fullWidth)
      .attr('height', fullHeight)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  }

  /**
   * Draws the shapes, labels, and axes.
   */
  render() {
    if (this.empty) {
      return;
    }

    // package scales for use as sub-render function
    // arguments
    const scales = {
      x: this.xScale,
      y: this.yScale
    };

    // draw lines
    this.svg
      .selectAll('.line')
      .data(this.years)
      .enter()
      .append('g')
      .attr('class', 'line')
      .each((d, i, elements) =>
        renderLines(d, i, elements, scales));

    // plot the points
    this.svg
      .selectAll('.data-points')
      .data(this.years)
      .enter()
      .append('g')
      .attr('class', 'data-points')
      .each((d, i, elements) =>
        renderPoints(d, i, elements, scales));

    // draw the checkbox labels (legend)
    this.svg
      .selectAll('.check-label')
      .data(this.years)
      .enter()
      .append('g')
      .attr('class', 'check-label')
      .each(checkboxLabel);

    // add axes last
    this.renderAxes();
  }

  /**
   * Builds the left and bottom axes and renders them to the
   * svg container. Should be last drawing operation.
   */
  renderAxes() {
    // setup the x-axis ticks
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May',
      'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const xAxis = axisBottom(this.xScale)
      .ticks(8)
      .tickSize(0)
      .tickFormat(m => months[m - 1]);

    // render the x-axis
    this.svg
      .append('g')
      .attr('transform', `translate(0, ${height + 40})`)
      .call(xAxis)
      .select('.domain').remove();

    // render the y-axis labels
    this.svg
      .append('g')
      .selectAll('text')
      .data(this.yScale.domain().reverse())
      .enter()
      .append('text')
      .text(d => format('$,.0f')(d))
      .attr('text-anchor', 'middle')
      .attr('transform', (d, i) =>
        `translate(-20, ${(height + 45) * i - 20})`);
  }
}
