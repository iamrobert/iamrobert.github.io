export default {
  els: {
    trigger: document.querySelector(".menu-trigger"),
    navbar: document.querySelector(".navbar"),
    categories: [].slice.call(document.querySelectorAll(".nav-top-link")),
    last_menu_item: document.querySelector(".top-menu-link:last-child")
  },

  isNavbarOpen() {
    return this.els.navbar.classList.contains("show");
  },

  openNavbar() {
    document.body.classList.add("stuck");
    this.els.navbar.classList.add("show");
  },

  closeNavbar() {
    document.body.classList.remove("stuck");
    this.closeCurrentlyOpenInnerMenus();
    this.els.navbar.classList.remove("show");
  },

  toggleNavbar() {
    this.isNavbarOpen() ? this.closeNavbar() : this.openNavbar();
  },

  exposeInnerMenu(inner_menu) {
    inner_menu.classList.add("expose");
  },

  closeCurrentlyOpenInnerMenus() {
    const inner_menus = [].slice.call(
      this.els.navbar.querySelectorAll(".dropdown-list.expose")
    );
    inner_menus.forEach(menu => menu.classList.remove("expose"));
  },

  handleInnerMenuClose(ev, close_button) {
    close_button.parentNode.parentNode.classList.remove("expose");
    ev.stopPropagation();
  },

  checkLatMenuItemHasSpace() {
    const rect = this.els.last_menu_item.getBoundingClientRect();
    const body_width = document.querySelector("body").getBoundingClientRect()
      .width;
    const dropdown = this.els.last_menu_item.querySelector(".dropdown-list");
    const dropdown_width = dropdown.getBoundingClientRect().width;

    const available_space = Math.floor(body_width - rect.right);
    const needed_space = Math.floor((dropdown_width - rect.width) / 2);

    if (available_space <= needed_space) {
      dropdown.classList.add("righty");
    }
  },

  init() {
    this.els.trigger.addEventListener("click", () => this.toggleNavbar());

    this.els.categories.forEach(category => {
      const category_menu = category.querySelector(".dropdown-list");

      if (!category_menu) {
        return;
      }

      const close_button = category_menu.querySelector(".inner-menu-close");
      close_button.addEventListener("click", ev =>
        this.handleInnerMenuClose(ev, close_button)
      );

      category.addEventListener("click", () =>
        this.exposeInnerMenu(category_menu)
      );
    });

    this.checkLatMenuItemHasSpace();
  }
};
