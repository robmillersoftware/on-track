import { margin, height, axisHeight, defaults } from './constants';
import { triangle } from './primitives';

export default class PanButtons {
  constructor(container) {
    this.container = container;
    this._refs = new WeakMap();
    this.width = defaults.fullWidth - margin.left - margin.right;
  }

  append() {
    this.left = this.container
      .append('g')
      .attr('class', 'prevnext-button')
      .attr('transform', 'translate(-38, 0)');

    this.left
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 36)
      .attr('height', height + axisHeight + 1)
      .attr('fill', 'transparent');

    this.left
      .append('g')
      .call(triangle)
      .attr('transform',
        `rotate(-90) translate(${-height - axisHeight + 12}, 15)`);

    this.right = this.container
      .append('g')
      .attr('class', 'prevnext-button')
      .attr('transform', `translate(${this.width + 2}, 0)`);

    this.right
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 36)
      .attr('height', height + axisHeight + 1)
      .attr('fill', 'transparent');

    this.right
      .append('g')
      .call(triangle)
      .attr('transform',
        `rotate(90) translate(${height + axisHeight - 23}, -21)`);

    // wire up the buttons
    this.left.on('click', () => this._pan(-1));
    this.right.on('click', () => this._pan(1));
  }

  _pan(delta) {
    const callback = this._refs.get(this.container);
    if (typeof callback === 'function') {
      callback(delta);
    }
  }

  onPan(callback) {
    this._refs.set(this.container, callback);
  }

  resize(width) {
    this.width = width;
    this.right
      .attr('transform', `translate(${this.width + 2}, 0)`);
  }
}
