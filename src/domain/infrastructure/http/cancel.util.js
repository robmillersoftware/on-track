import { now } from '../../util';

const latest = {};

/**
 */
export const cancelable = (promise, resourceId, options, $q) => {
  const defer = $q.defer();

  if (options.cancelPending) {
    // set timestamp of latest request
    const ts = now();
    latest[resourceId] = ts;
    options.ts = ts;
  }

  promise
    .then(response => {
      if (options.cancelPending && options.ts !== latest[resourceId]) {
        return defer.reject({
          canceled: true,
          reason: 'cancelPending was true'
        });
      }
      return defer.resolve(response);
    })
    .catch(err => defer.reject(err));

  return defer.promise;
};
