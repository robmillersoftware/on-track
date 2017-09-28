import { min, max, extent } from 'd3-array';
import { easeCubicOut } from 'd3-ease';
import { scaleLinear, scaleTime } from 'd3-scale';
import { select } from 'd3-selection';
import 'd3-transition';
import {
  margin,
  fullHeight,
  height,
  axisHeight,
  numWeeks,
  defaults
} from './constants';
import { clamp } from './util';
import { yAxis } from './y-axis';
import BottomAxis from './bottom-axis';
import Areas from './areas';
import WeekSelector from './week-selector';
import PanButtons from './pan-buttons';
import DraggableHandle, { HANDLE_DRAG } from './draggable-handle';
import CashReserveLine from './cash-reserve-line';
import CashReserveClip from './cash-reserve-clip';
import TodayPin from './today-pin';

// The top-level chart
export default class TimelineChart {
  constructor(data) {
    this.data = data;
    this.fullWidth = defaults.fullWidth;
    this.width = defaults.fullWidth - margin.left - margin.right;
    this.viewportSize = defaults.viewportSize;
    this.viewportX = 0;
    this.children = [];
  }

  init() {
    this.svg = select('#timelineChart')
      .attr('width', this.fullWidth)
      .attr('height', fullHeight);

    this._createClipRegions();

    this._createContainers();
  }

  append() {
    this._defineScales();

    this._createChildren();

    // call append() on children
    for (const child of this.children) {
      child.append();
    }
  }

  resize(width, viewportSize = 6) {
    this.viewportSize = viewportSize;
    this.fullWidth = width;
    this.width = this.fullWidth - margin.left - margin.right;

    // update svg element width
    this.svg.attr('width', this.fullWidth);

    // update x-scale range
    const xMax = (this.width / this.viewportSize) * numWeeks;
    this.xScale.range([0, xMax]);

    // resize child components
    for (const child of this.children) {
      if (typeof child.setScales === 'function') {
        child.setScales(this.xScale, this.yScale);
      }
      child.resize(this.width, this.viewportSize);
    }

    // update viewport clip box width
    this.viewClip
      .attr('width', this.width + 2);

    // update viewport x position
    const x = this.width / this.viewportSize * -this.viewportX;
    this.viewport
      .attr('transform', `translate(${x}, 0)`);
  }

  panViewport(delta) {
    this.viewportX += delta;
    const maxViewportPos = numWeeks - this.viewportSize - 1;
    this.viewportX = clamp(this.viewportX, 0, maxViewportPos);

    const x = this.width / this.viewportSize * -this.viewportX;
    this.viewport
      .transition()
      .duration(500)
      .ease(easeCubicOut)
      .attr('transform', `translate(${x}, 0)`);
  }

  // Helper functions

  _createContainers() {
    this.inner = this.svg
      .append('g')
      .attr('class', 'g-inner')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('clip-path', 'url(#inner-clip)');

    this.viewport = this.inner.append('g');

    this.outer = this.svg
      .append('g')
      .attr('class', 'g-outer')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  }

  _defineScales() {
    // compute min/max and scales
    const yMin = min(this.data, d =>
      Math.min(d.confirmed, d.unconfirmed));
    const yMax = max(this.data, d =>
      Math.max(d.confirmed, d.unconfirmed));

    this.xScale = scaleTime()
      .domain(extent(this.data, d => d.date))
      .range([0, (this.width / this.viewportSize) * numWeeks]);

    this.yScale = scaleLinear()
      .domain([yMin, yMax])
      .range([height, 0]);

    this.yAxis = yAxis.bind(null, yMin, yMax);
  }

  _createChildren() {
    // the green 'confirmed' and 'unconfirmed' areas
    const areas = new Areas(this.viewport, this.data);
    areas.setScales(this.xScale, this.yScale);
    this.children.push(areas);

    // the 'today' pin and label
    const todayPin = new TodayPin(this.viewport, this.data);
    todayPin.setScales(this.xScale, this.yScale);
    this.children.push(todayPin);

    // x-axis
    const bottomAxis = new BottomAxis(this.viewport, this.data);
    this.children.push(bottomAxis);

    // y-axis labels
    this.outer.call(this.yAxis);

    // create/recreate the weeks selector
    const weekSelector = new WeekSelector(this.outer, this.data);
    this.children.push(weekSelector);

    // forward & back buttons
    const panButtons = new PanButtons(this.outer);
    panButtons.onPan(this.panViewport.bind(this));
    this.children.push(panButtons);

    // cash reserve / shortfall line
    const cashReserveLine = new CashReserveLine(this.viewport);
    this.children.push(cashReserveLine);

    // clipping region for shortfall color change
    const cashReserveClip = new CashReserveClip(this.svg, this.data);
    cashReserveClip.setScales(this.xScale, this.yScale);
    this.children.push(cashReserveClip);

    // cash reserve drag handle
    const handle = new DraggableHandle(this.outer, this.yScale);
    // move cash reserve line with the handle
    handle.onDrag(e => {
      if (e.type === HANDLE_DRAG) {
        cashReserveLine.move(e.y);
      }
    });
    this.children.push(handle);
  }

  _createClipRegions() {
    // chart 'areas' viewport clipping
    this.viewClip = this.svg
      .append('clipPath')
      .attr('id', 'inner-clip')
      .append('rect')
      .attr('x', -1)
      .attr('y', -20)
      .attr('width', this.width + 2)
      .attr('height', height + axisHeight + 40);
  }
}
