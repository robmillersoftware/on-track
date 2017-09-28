import template from './daily-tracker.html';
import controller from './daily-tracker.controller';

/**
 * Activity menu for mobile (smartphone). This
 * will be the only menu in the mobile app.
 */
export const dailyTrackerComponent = {
  template,
  controller,
  bindings: {
    dailyGoal: '<',
    currentRevenue: '<',
    openDetail: '&'
  }
};
