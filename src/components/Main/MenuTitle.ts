import Component from '../../core/Component';

export default class MenuTitle extends Component {
  template() {
    const menuController = this?.props?.menuController;
    const total = menuController.getList().length;
    const title = menuController.currentTab();
    return `
    <h2 class="mt-1 menu-title">${title} 메뉴 관리</h2>
    <span class="mr-2 mt-4 menu-count">총 ${total}개</span>
    `;
  }
}
