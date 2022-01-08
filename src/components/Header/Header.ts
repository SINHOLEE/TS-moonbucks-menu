import Component, { BindEvent } from '../../core/Component';
import Category from './Category';
import { EVENTS } from '../../constants';
import { CoffeeKeys } from '../../modules/type';
import { MenuController } from '../../modules/notUsingMiddlewares/menuController';

export default class Header extends Component {
  protected props: {
    menuController: MenuController;
  };
  get menuController() {
    if (this?.props?.menuController === undefined) {
      throw new Error('menuController should exists');
    }
    return this.props.menuController;
  }
  template() {
    return `
    <a href="/" class="text-black">
      <h1 class="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
    </a>
    <nav
      class="d-flex justify-center flex-wrap nav-category-tab"
      data-component="category"
    >
		{{category}}
    </nav>
    `;
  }
  mount() {
    this.addChildComponent(
      new Category({ key: 'category', $parent: this.$parent }),
    );
  }
  bindEvents() {
    return [
      {
        eventType: EVENTS.click,
        callback: (e: MouseEvent) => {
          const target = e.target;
          if (target === null) {
            return;
          }
          if ((<Element>target).closest('[data-category-name]')) {
            const clickedTab = (<HTMLElement>target).dataset['categoryName'];
            if (clickedTab === undefined) {
              return;
            }
            this.menuController.changeTab(clickedTab as CoffeeKeys);
          }
        },
      } as BindEvent,
    ];
  }
}
