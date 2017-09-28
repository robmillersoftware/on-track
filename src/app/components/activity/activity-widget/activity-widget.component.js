import template from './activity-widget.html';
import controller from './activity-widget.controller';

/**
 * Activity widget component. Contains activity
 * pinned card that holds transactions-table.
 */
export const activityWidgetComponent = {
  template,
  controller,
  bindings: {
    showMore: '<?',
    incrementBy: '<?'
  }
};
