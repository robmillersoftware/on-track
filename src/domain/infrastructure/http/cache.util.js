import { now } from '../../util';

/**
 * Checks cache for existence of item by key, and if it exists checks if it's
 * expired. If expired the cache item is removed, otherwise it is returned.
 * @param {Object} cache The cache service instance to check.
 * @param {string} key The key of the cache item being checked for.
 * @param {Object} options An http options object to check for cache policy.
 * @returns {Object|boolean} The cache item if it exists and is not expires,
 *  otherwise returns false.
 */
const checkCache = (cache, key, options = {}) => {
  if (options.cache && options.cacheExpire) {
    // check cache.. if exists check expiration..
    const cached = cache.get(key);

    // if exists and not expired -> return cached
    if (cached && cached.expires > now()) {
      return cached;
    }

    if (cached && cached.expires <= now()) {
      cache.remove(key);
    }

    // if expired or not exists, clear options.cache and continue
    delete options.cache;
  }
  return false;
};

/**
 * Converts params object (key/value pairs) to a query string.
 * @param {Object} p The params object container key/value pairs to serialize.
 * @returns {string} The key/value pairs as a string where key/value is
 *  delimited by '=' and pairs are separated by '&'.
 */
const serialize = p =>
  Object.keys(p).map(key =>
    `${encodeURIComponent(key)}=${encodeURIComponent(p[key])}`)
    .join('&');

/**
 */
export const cacheable = (promise, resourceId, options, cache) => {
  const key = `${resourceId}?${serialize(options.params || {})}`;
  const cached = checkCache(cache, key, options);

  if (cached) {
    return cache.dataAsPromise(cached);
  }

  return promise
    .then(response => {
      if (options.cacheExpire) {
        // push to cache and set expiration
        cache.put(key, response, options.cacheExpire);
      }
      return response;
    });
};
