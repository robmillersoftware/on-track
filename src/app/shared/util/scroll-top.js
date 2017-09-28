/**
 * Gets the `window.scrollTop` property in cross-browser way.
 */
export const scrollTop = () =>
  window.scrollTop ||
  window.document.body.scrollTop ||
  window.document.documentElement.scrollTop;
