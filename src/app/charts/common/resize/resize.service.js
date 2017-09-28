import { element } from 'angular';

export default class ResizeService {
  constructor($window) {
    'ngInject';
    this.$window = $window;
    this._subscribers = {};
    element($window).on('resize', this._onResize.bind(this));
  }

  subscribe(key, callback) {
    this._subscribers[key] = callback;
  }

  unsubscribe(key) {
    delete this._subscribers[key];
  }

  _onResize(e) {
    Object.keys(this._subscribers).forEach(key =>
      this._subscribers[key].call(null, e));
  }
}
