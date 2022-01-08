import Component from '../../core/Component';
import MenuTitle from './MenuTitle';
import { MenuController } from '../../modules/notUsingMiddlewares/menuController';
import { createCurrentMenuRepository } from '../../modules/notUsingMiddlewares/Repository';
import MenuInput from './MenuInput';
import MenuList from './MenuList/MenuList';

export default class Main extends Component {
  template() {
    return `
    <div class="wrapper bg-white p-10">
          <div class="heading d-flex justify-between" data-component="menu-title">
            {{menu-title}}
          </div>
          <form id="espresso-menu-form" data-component="menu-input">
            {{menu-input}}
          </form>
          <ul id="espresso-menu-list" class="mt-3 pl-0" data-component="menu-list">
            {{menu-list}}
          </ul>
        </div>
    `;
  }
  mount() {
    const currentMenuRepo = createCurrentMenuRepository(this.store, {});
    const menuController = MenuController(currentMenuRepo);
    this.addChildComponent(
      new MenuTitle({
        key: 'menu-title',
        props: {
          menuController,
        },
      }),
    );
    this.addChildComponent(
      new MenuInput({
        key: 'menu-input',
        props: {
          menuController,
        },
      }),
    );
    this.addChildComponent(
      new MenuList({
        key: 'menu-list',
        props: {
          menuController,
        },
      }),
    );
  }
}
