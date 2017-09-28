
export default class MobileMenuController {
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
