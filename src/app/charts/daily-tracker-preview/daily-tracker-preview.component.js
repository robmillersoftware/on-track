import template from './daily-tracker-preview.html';
import controller from './daily-tracker-preview.controller';

export const dailyTrackerPreview = {
  template,
  controller,
  bindings: {
    dailyGoal: '<',
    currentRevenue: '<'
  }
};
