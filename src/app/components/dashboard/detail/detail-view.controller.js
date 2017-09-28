export default class DetailViewController {
  constructor($state, $mdUtil) {
    'ngInject';
    this.$state = $state;
    this.$mdUtil = $mdUtil;

    // list of states that are included in the navbar
    this.tabs = [
      { title: 'Activity', name: 'activity' },
      { title: 'Trend', name: 'trend' },
      { title: 'Timeline', name: 'timeline' },
      { title: 'Spend Analysis', name: 'spendanalysis' },
      { title: 'Cash In', name: 'cashin' },
      { title: 'Cash Out', name: 'cashout' },
      { title: 'Invoices | Bill | Sync', name: 'billdotcom' }
    ];
  }

  /**
   * Gets the tab index of a tab by name.
   * @param {string} name The `name` of the tab to lookup.
   */
  getTabIndex(name) {
    const tab = this.tabs.find(t => t.name === name);
    return this.tabs.indexOf(tab);
  }

  /**
   * Updates left-right direction of sub-view transition based on
   * relationship of current tab to previous tab.
   * @param {Object} changes.currentTab Pulls currentTab value from
   * `changes` object.
   */
  updateTransition({ currentTab }) {
    if (currentTab) {
      const index = this.getTabIndex(currentTab ?
        currentTab.currentValue :
        this.currentTab);
      // use prev and current index to determine which transition
      // animation to use (from left or from right)
      const previous = currentTab ?
        this.getTabIndex(currentTab.previousValue) : 0;

      // set transition direction based on relationship between
      // previous and current tab index
      this.transition = previous < (index || 0) ?
        'slide-left' : 'slide-right';
    }
  }

  /**
   * When the `currentTab` binding changes, and `isActive` binding is `true`,
   * updates the selected tab and transitions to the new state.
   * Also checks the `noNavbar` list and hides the navbar is applicable.
   * @param {Object} changes Object representing changes with previous
   * and current values.
   */
  $onChanges(changes) {
    const index = this.getTabIndex(changes.currentTab ?
      changes.currentTab.currentValue :
      this.currentTab);
    this.hideNavbar = index < 0;

    // if the navbar is displayed update the selected index
    if (!this.hideNavbar) {
      this.selectedIndex = index;
    }

    this.updateTransition(changes);

    // deferring this so transition css class will be updated
    this.$mdUtil.nextTick(() =>
      this.$state.go(`dashboard.${this.currentTab}`), 0);
  }
}
