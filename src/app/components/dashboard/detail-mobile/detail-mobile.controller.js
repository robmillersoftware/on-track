export default class DetailMobileController {
  constructor($mdDialog) {
    'ngInject';
    this.$mdDialog = $mdDialog;
  }

  close() {
    this.$mdDialog.cancel();
  }
}
