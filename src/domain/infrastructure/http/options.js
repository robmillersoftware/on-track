/**
 * Default http `options` object.
 * * @param {string} [opts.api] Specifies the REST API to target. Can be either
 *  'cfi' (default) or 'olb'.
 * @param {boolean} [opts.cache] Enables or disabled caching.
 * @param {number} [opts.cacheExpire] Max age of cache in ms before it will be
 *  invalidated. Only applies to GET requests.
 * @param {boolean} [opts.cancelPending] If `true` will abort pending request(s)
 *  to same endpoint. Params may or may not differ.
 * @param {number} [opts.retry] If present the request will be retried up to the
 *  specified number of times upon failure.
 * @param {number} [opts.timeout] Request timeout in milliseconds.
 * @param {Object} [opts.headers] Map of strings or functions which return
 *  strings representing HTTP headers to send to the server.
 * @param {Object.<string|Object>} [opts.params] Map of strings or objects which
 *  will be serialized with the paramSerializer and appended as GET parameters.
 * @param {Object|string} [opts.data] Data to be sent as the request message
 *  data.
 */
export const defaultOptions = {
  api: 'cfi',
  cache: false,
  cacheExpire: undefined,
  cancelPending: false,
  retry: 0,
  timeout: 60000,
  headers: {},
  params: {},
  data: ''
};
