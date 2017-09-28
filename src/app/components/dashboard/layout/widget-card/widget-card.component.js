import template from './widget-card.html';

export const widgetCardComponent = {
  template,
  transclude: true,
  bindings: {
    widget: '@',
    pinned: '<?',
    onOpenDetail: '&'
  }
};
