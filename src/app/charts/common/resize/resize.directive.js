export const resizable = ($parse, ResizeService, $mdUtil) => {
  'ngInject';
  const postLink = (scope, elem, attr) => {
    const container = elem[0];
    const key = `${container.id}-${container.classList}`;
    const onResize = () => {
      // get container dimensions
      const { clientWidth, clientHeight } = container;
      const data = {
        width: clientWidth,
        height: clientHeight
      };
      scope.$apply(() => $parse(attr.resizable)(scope, {
        data
      }));
    };

    ResizeService.subscribe(key, onResize);

    scope.$on('$destroy', () =>
      ResizeService.unsubscribe(key));

    $mdUtil.nextTick(() => onResize());
  };

  return {
    restrict: 'A',
    scope: false,
    link: {
      post: postLink
    }
  };
};
