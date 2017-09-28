import { responsivefy } from './responsivefy';

export const responsiveChart = () => {
  const postLink = (scope, elem) => {
    const container = elem[0];
    const key = `${container.id}-${container.classList}`;
    responsivefy(key, container);

    scope.$on('$destroy', () =>
      responsivefy(key));
  };

  return {
    restrict: 'A',
    scope: false,
    link: {
      post: postLink
    }
  };
};
