// Turn on *everything* in `ngAria`
export const ariaConfig = $ariaProvider => {
  'ngInject';
  $ariaProvider.config({
    ariaHidden: true,
    ariaChecked: true,
    ariaReadonly: true,
    ariaDisabled: true,
    ariaRequired: true,
    ariaInvalid: true,
    ariaValue: true,
    tabindex: true,
    bindKeypress: true,
    bindRoleForClick: true
  });
};
