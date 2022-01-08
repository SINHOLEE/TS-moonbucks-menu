import Component, { BindEvent } from '../../../core/Component';
import { MenuController } from '../../../modules/notUsingMiddlewares/menuController';
import { MenuItem } from './MenuItem';
import { EVENTS, MESSAGES, SELECTORS } from '../../../constants';

export default class MenuList extends Component {
  get menuController() {
    return this?.props?.menuController as MenuController;
  }
  get menuList() {
    return this.menuController.getList();
  }
  template() {
    return `${this.menuList
      .map(
        item => `
    <li class="menu-list-item d-flex items-center py-2" data-component="item-${item.id}">
    {{${item.text}}}
    </li>
    `,
      )
      .join('')}`;
  }

  mount() {
    this.menuList.forEach(item =>
      this.addChildComponent(
        new MenuItem({ key: `item-${item.id}`, props: { item } }),
      ),
    );
  }

  onToggleSoldOut(e: MouseEvent) {
    const { target } = e;
    if ((target as Element).closest('.menu-sold-out-button')) {
      const id = (target as HTMLElement).dataset.id;
      this.menuController.toggleSoldOut(id);
    }
  }

  // service 에서 ui control 까지 맡기기
  onEdit(e: MouseEvent) {
    const { target } = e;
    if ((target as Element).closest(SELECTORS.CLASS.MENU_EDIT_BUTTON)) {
      const id = (target as HTMLElement).dataset.id;
      this.menuController.edit(id);
    }
  }
  // ui 컨트롤은 component 에 맡기기
  onDelete(e: MouseEvent) {
    const { target } = e;
    if ((target as Element).closest(SELECTORS.CLASS.MENU_REMOVE_BUTTON)) {
      const answer = confirm(MESSAGES.CONFIRM_REMOVE);
      if (answer) {
        const id = (target as HTMLElement).dataset.id;
        this.menuController.remove(id);
      }
    }
  }

  bindEvents() {
    return [
      {
        eventType: EVENTS.click,
        callback: this.onEdit.bind(this),
      },
      {
        eventType: EVENTS.click,
        callback: this.onToggleSoldOut.bind(this),
      },
      {
        eventType: EVENTS.click,
        callback: this.onDelete.bind(this),
      },
    ] as BindEvent[];
  }
}
