
export default class DailyTrackerController {
  constructor() {
    this.isOpen = true;
  }

  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }

  openItem(item) {
    this.openDetail({ view: item });
  }
}
