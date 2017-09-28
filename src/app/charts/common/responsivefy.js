import { select } from 'd3-selection';

const unsub = key =>
  select(window).on(`resize.${key}`, null);

export function responsivefy(key, container) {
  if (!container) {
    // if container isn't passed we unsub listener and return
    return unsub(key);
  }

  // get container + svg aspect ratio
  const svg = select(container.querySelector('svg'));

  // svg element is required but fail silently
  if (svg.empty()) {
    return unsub(key);
  }

  const width = parseInt(svg.style('width'), 10);
  const height = parseInt(svg.style('height'), 10);
  const aspect = width / height;

  // get width of container and resize svg to fit it
  const resize = () => {
    const targetWidth = parseInt(select(container).style('width'), 10);
    svg.attr('width', targetWidth);
    svg.attr('height', Math.round(targetWidth / aspect));
  };

  // add viewBox and preserveAspectRatio properties,
  // and call resize so that svg resizes on inital page load
  svg.attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMinYMid')
    .call(resize);

  select(window).on(`resize.${key}`, resize);
  return resize;
}
