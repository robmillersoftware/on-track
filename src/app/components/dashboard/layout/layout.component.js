import template from './layout.html';
import controller from './layout.controller';

/**
 * Container component that manages the cards layout of the dashboard.
 * This is separate from the higher-level dashboard component in order
 * that it can be easily loaded and unloaded as needed.
 * The parent `dashboard` component cares about global state, namely the
 * list of all accounts, whereas the `layout` component and its children
 * only care about the currently selected account state.
 */
export const layoutComponent = {
  template,
  controller
};
