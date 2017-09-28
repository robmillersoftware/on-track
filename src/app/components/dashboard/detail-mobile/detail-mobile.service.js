export default class detailMobileService {
  constructor($mdDialog) {
    'ngInject';
    this.$mdDialog = $mdDialog;
  }

  openDetail(key) {
    const template = `
      <md-dialog aria-label="Detail view">
        <detail-mobile view="${key}"></detail-mobile>
      </md-dialog>`;

    this.$mdDialog.show({
      template,
      fullscreen: true
    });
  }
}
