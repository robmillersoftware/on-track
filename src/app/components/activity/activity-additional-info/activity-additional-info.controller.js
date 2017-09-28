export default class ActivityAdditionalInfoController {
  constructor($ngRedux, AccountActions) {
    'ngInject';
    this.store = $ngRedux;
    this.actions = AccountActions;
  }

  $onInit() {
    const actions = Object.assign({}, this.actions);
    this.unsubscribe = this.store.connect(this.mapStateToThis, actions)(this);
  }

  $postLink() {
    this.fetchAccount();
  }

  mapStateToThis = (state) => {
    const { account } = state;
    return {
      account
    };
  };
}
