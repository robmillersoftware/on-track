export default class OnlineStatementsController {
  constructor($ngRedux, OnlineStatementsActions) {
    'ngInject';
    this.store = $ngRedux;
    this.actions = OnlineStatementsActions;
  }

  $onInit() {
    const actions = Object.assign({}, this.actions);
    this.unsubscribe = this.store.connect(this.mapStateToThis, actions)(this);
  }

  /**
   * $postLink Function - Called when DOM is ready and we know the activity
   * actions will return an instance
   *
   * @returns {undefined} No [Explicit] Return
   */
  $postLink() {
    this.fetchAccount();
  }

  /**
   * Returns the URL for the online statement PDF for the given month.
   * @param month - The month object from the redux.
   * @returns - The URL for the online statement PDF for that month.
   */
  getPDF = month => {
    const server = 'https://onlinebanking-q8.pnc.com';
    let url = null;
    if (this.onlineStatements && this.onlineStatements.account &&
      this.onlineStatements.account.id) {
      const id = this.onlineStatements.account.id;
      url = `${server}/statements/${id}/pdf?date=${month.date}`;
      if (this.onlineStatements.account.typeCode === 'CCA') {
        url = `${server}/creditcards/${id}/statements`;
      }
    }
    return url;
  };

  mapStateToThis(state) {
    const { onlineStatements } = state;
    return {
      onlineStatements
    };
  }
}
