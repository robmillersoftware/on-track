import { drag } from 'd3-drag';
import { format } from 'd3-format';
import { event } from 'd3-selection';
import { margin, height, defaults } from './constants';
import { clamp } from './util';
import { line } from './primitives';

/**
 * Builds and manages dragable handle
 */
export const HANDLE_DRAG_START = 'DRAG_START';
export const HANDLE_DRAG = 'DRAG';
export const HANDLE_DRAG_END = 'DRAG_END';

const path = [
  { x: 0, y: 0 },
  { x: 10, y: 13 },
  { x: 66, y: 13 },
  { x: 66, y: -13 },
  { x: 10, y: -13 },
  { x: 0, y: 0 }
];

export default class DraggableHandle {
  constructor(container, yScale) {
    this.container = container;
    this._refs = new WeakMap();
    this.yScale = yScale;
    this.width = defaults.fullWidth - margin.left - margin.right;
    this.y = -14;
  }

  append() {
    this.handle = this.container
      .append('g')
      .style('cursor', 'ns-resize')
      .attr('transform', `translate(${this.width + 15}, 0)`);

    this.handle
      .append('path')
      .datum(path)
      .attr('d', line)
      .attr('class', 'handle');

    this.handleText = this.handle
      .append('text')
      .attr('x', 35)
      .attr('y', 4)
      .text(format('$,.0f')(this.yScale.invert(0)))
      .attr('class', 'handle-text');

    // invisible drag surface
    this.draggable = this.container
      .append('g')
      .attr('transform', `translate(${this.width + 15}, -14)`)
      .call(drag()
      .on('start', this._dragstart.bind(this))
      .on('drag', this._dragged.bind(this))
      .on('end', this._dragended.bind(this)));

    this.draggable
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 67)
      .attr('height', 28)
      // .attr('tabindex', 1)
      .attr('class', 'draggable-handle');
  }

  resize(width) {
    this.width = width;
    this.handle
      .attr('transform', `translate(${this.width + 15}, ${this.y + 14})`);
    this.draggable
      .attr('transform', `translate(${this.width + 15}, ${this.y})`);
  }

  onDrag(callback) {
    this._refs.set(this.container, callback);
  }

  _dragstart() {
    this._getCallback().call(null, {
      type: HANDLE_DRAG_START
    });
  }

  _dragged() {
    const y = clamp(event.y, 0, height);
    this._moveHandle(y);
    this.handleText
      .text(format('$,.0f')(this.yScale.invert(y)));
    this._getCallback().call(null, {
      type: HANDLE_DRAG,
      y
    });
  }

  _dragended() {
    // move draggable rect to new pos
    this.y = clamp(event.y - 14, -14, height - 14);
    this.draggable
      .attr('transform', `translate(${this.width + 15}, ${this.y})`);
    this._getCallback().call(null, {
      type: HANDLE_DRAG_END,
      y: this.y
    });
  }

  _moveHandle(yPos) {
    this.y = yPos;
    this.container
      .selectAll('line')
      .attr('y1', this.y)
      .attr('y2', this.y);
    this.handle
      .attr('transform', `translate(${this.width + 15}, ${this.y})`);
    this.draggable
      .attr('transform', `translate(${this.width + 15}, ${this.y - 14})`);
  }

  _getCallback() {
    const callback = this._refs.get(this.container);
    return (typeof callback === 'function') ? callback : () => {};
  }
}
