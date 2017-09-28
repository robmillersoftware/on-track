import colors from '../../../wbb-ui-base/styles/_colors.json';

export const materialConfig = ($mdIconProvider, $mdThemingProvider) => {
  'ngInject';
  /**
  See `./readme.md` for info on adding icons.
  */
  const iconSize = 24;
  $mdIconProvider
    .icon('print', 'ic_print_black_24px.svg', iconSize)
    .icon('settings', 'ic_settings_black_24px.svg', iconSize)
    .icon('add', 'ic_add_black_24px.svg', iconSize)
    .icon('chevron-right', 'ic_chevron_right_black_24px.svg', iconSize)
    .icon('chevron-left', 'ic_chevron_left_black_24px.svg', iconSize)
    .icon('chevron-down', 'ic_keyboard_arrow_down_black_24px.svg', iconSize)
    .icon('twitter-blue', 'icon-twitter-blue.svg', iconSize)
    .icon('pin-active', 'icon-pin-active.svg', iconSize)
    .icon('search', 'ic_search_black_24px.svg', iconSize)
    .icon('overflow', 'ic_more_vert_black_24px.svg', iconSize)
    .icon('close', 'ic_close_black_24px.svg', iconSize)
    .icon('down-arrow', 'icon-down-arrow.svg', iconSize)
    .icon('up-arrow', 'icon-up-arrow.svg', iconSize)
    .icon('alert-outline', 'icon-alert-outline.svg', iconSize)
    .icon('pdf', 'ic_picture_as_pdf_black_24px.svg', iconSize)
    .icon('plus', 'plus.svg', iconSize)
    .icon('minus', 'minus.svg', iconSize)
    .icon('replay', 'ic_replay_black_24px.svg', iconSize);

  // removes leading '#' char
  const color = key => colors[key].slice(1);

  /**
  Color Palette Config
  */
  const pncBlueMap = $mdThemingProvider.extendPalette('blue', {
    500: color('cfi-blue'), // primary: for buttons, floating labels, borders
    600: color('wbb-darkest-blue'), // for hover and active states
    contrastDefaultColor: 'light'
  });

  const cfiAccentMap = $mdThemingProvider.extendPalette('light-blue', {
    A200: color('cfi-lightest-blue'),
    A700: color('cfi-light-blue'),
    contrastDefaultColor: 'light'
  });

  const pncRedMap = $mdThemingProvider.extendPalette('red', {
    500: color('wbb-red')
  });

  // Register the new color palette maps
  $mdThemingProvider.definePalette('pncBlue', pncBlueMap);
  $mdThemingProvider.definePalette('cfiAccent', cfiAccentMap);
  $mdThemingProvider.definePalette('pncRed', pncRedMap);

  // Use the new themes for the primary intentions and accent intentions
  $mdThemingProvider.theme('default')
  .primaryPalette('pncBlue')
  .accentPalette('cfiAccent')
  .warnPalette('pncRed');
};
