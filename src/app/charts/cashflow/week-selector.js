import { easeCubicOut } from 'd3-ease';
import { event, mouse, select } from 'd3-selection';
import { symbol, symbolTriangle } from 'd3-shape';
import 'd3-transition';
import { margin, height, axisHeight, defaults } from './constants';
import { line } from './primitives';

export default class WeekSelector {
  constructor(container, data) {
    this.container = container;
    this.data = data;
    this.width = defaults.fullWidth - margin.left - margin.right;
    this.columnWidth = this.width / defaults.viewportSize;
    this.buildLineData();
    this.position = 0;
  }

  append() {
    this.selector = this.container
      .append('g')
      .attr('class', 'selector');

    // draw selector path
    this.selector
      .append('path')
      .datum(this.lineData)
      .attr('d', line);

    // selector circle
    this.selector
      .append('circle')
      .attr('cx', this.columnWidth)
      .attr('cy', -10)
      .attr('r', 8);

    this.drawLabels(this.selector);

    // handle click anywhere within chart
    select('#timelineChart')
      .on('click', this.handleClick.bind(this));
  }

  resize(width, viewportSize) {
    this.width = width;
    this.columnWidth = width / viewportSize;
    this.buildLineData();

    this.selector
      .select('path')
      .datum(this.lineData)
      .attr('d', line);

    this.selector
      .select('circle')
      .attr('cx', this.columnWidth);

    this.projected
      .attr('x', this.columnWidth);

    this.selectWeek(this.position);
  }

  handleClick() {
    const x = mouse(event.currentTarget)[0] - margin.left;
    if (x < 0 || x > this.width) return;
    const weekPos = Math.floor(x / this.columnWidth);
    this.selectWeek(weekPos);
  }

  drawLabels(parent) {
    // large "projected" label
    this.projected = parent
      .append('text');

    this.projected
      .text('$115,083 Projected')
      .attr('y', -34)
      .attr('x', this.columnWidth)
      .attr('class', 'label-projected');

    // draw triangle
    const triangle = symbol().size([50]);

    this.net = parent
      .append('g');

    this.netGlyph = this.net
      .append('path')
      .attr('d', triangle.type(symbolTriangle))
      .attr('class', 'triangle')
      // TODO: only rotate if net amount is negative
      .attr('transform', 'rotate(180) translate(-12, 8)');

    // TODO: should be net amount over selected interval (1-week by default,
    // but will be able to adjust week selector)
    this.netLabel = this.net
      .append('text')
      .text('-$4,424 Net')
      .attr('x', 22)
      .attr('y', -2)
      .attr('class', 'label-net');
  }

  selectWeek(position) {
    this.position = position;
    this.selector
      .transition()
      .duration(300)
      .ease(easeCubicOut)
      .attr('transform', `translate(${this.position * this.columnWidth}, 0)`);
  }

  buildLineData() {
    const center = this.columnWidth / 2;
    this.lineData = [{
      x: 0,
      y: -10
    },
    {
      x: 0,
      y: height + axisHeight
    },
    {
      x: center - 6,
      y: height + axisHeight
    },
    {
      x: center,
      y: height + axisHeight + 5
    },
    {
      x: center + 6,
      y: height + axisHeight
    },
    {
      x: this.columnWidth,
      y: height + axisHeight
    },
    {
      x: this.columnWidth,
      y: -10
    }];
  }
}
