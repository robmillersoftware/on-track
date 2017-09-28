/**
 */
export const retryable = (func, options) =>
  func(options)
    .catch(err => options.retry && !err.canceled ?
      retryable(func,
        Object.assign({}, options, { retry: options.retry - 1 }), err) :
        (function rethrow() { throw err; }()));
