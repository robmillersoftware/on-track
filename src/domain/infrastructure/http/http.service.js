import { rootUrlCfi, rootUrlOlb } from '../api-config';
import { defaultOptions } from './options';
import { cacheable } from './cache.util';
import { cancelable } from './cancel.util';
import { retryable } from './retry.util';
import { responseMap } from './response-map.util';

/**
 * Internal HTTP service used by domain services to interact with the legacy
 * backend JSON APIs.
 * Provides appropriate defaults, easy resource pathing using key, and basic
 * caching functionality & subset of http request options. See `./options.js`
 * for available options.
 */
export class Http {
  constructor($http, $q, _cache) {
    'ngInject';
    this.$http = $http;
    this.$q = $q;
    this._cache = _cache;
  }

  /**
   * Fetches an HTTP resource by `resourceId`.
   * @param {string} resourceId The resource identifier.
   * @param {Object?} options Optional HTTP request options hash map.
   * @returns {Promise.<Object, Error>} Forwards promise returned by Angular
   *  $http service.
   */
  get(resourceId, options = {}) {
    const baseUrl = options.api === 'olb' ? rootUrlOlb : rootUrlCfi;
    return retryable((opt) =>
        cacheable(
          cancelable(
            this.$http.get(`${baseUrl}${resourceId}`,
              Object.assign({}, defaultOptions, opt)),
          resourceId, opt, this.$q),
        resourceId, opt, this._cache),
      options)
      .then(res => responseMap(res));
  }
}
