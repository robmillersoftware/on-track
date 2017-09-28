import { now } from '../../util';

/**
 */
export class Cache {
  constructor($q) {
    'ngInject';
    this.$q = $q;
    this.entries = {};
  }

  /**
   */
  get(key) {
    return this.entries[key];
  }

  /**
   */
  put(key, data, expire = 0) {
    this.entries[key] = {
      data,
      expires: now() + expire
    };
  }

  /**
   */
  remove(key) {
    delete this.entries[key];
  }

  /**
   */
  removeAll() {
    this.entries = {};
  }

  /**
   */
  dataAsPromise(cacheEntry) {
    return this.$q.when(cacheEntry.data);
  }
}
