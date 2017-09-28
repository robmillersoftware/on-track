/**
 * Changes the current view within the detail component.
 */
export const DETAIL_VIEW_TAB_CHANGE = 'DETAIL_VIEW_TAB_CHANGE';
/**
 * Action that causes detail view to load and transition into view.
 */
export const DETAIL_VIEW_ACTIVATE = 'DETAIL_VIEW_ACTIVATE';
/**
 * Causes detail view to transition out and unload.
 */
export const DETAIL_VIEW_DEACTIVATE = 'DETAIL_VIEW_DEACTIVATE';

export const changeDetailTab = tab => ({
  type: DETAIL_VIEW_TAB_CHANGE,
  payload: { tab }
});

/**
 * Sets isActive value to true
 */
export const showDetail = () => ({
  type: DETAIL_VIEW_ACTIVATE,
  payload: { isActive: true }
});

/**
 * Sets isActive value to false
 */
export const hideDetail = () => ({
  type: DETAIL_VIEW_DEACTIVATE,
  payload: { isActive: false }
});
