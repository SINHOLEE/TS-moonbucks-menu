import Component from '../core/Component';
import { createCurrentMenuRepository } from '../modules/notUsingMiddlewares/Repository';
import Header from './Header/Header';
import Main from './Main/Main';
import { MenuController } from '../modules/notUsingMiddlewares/menuController';

export default class App extends Component {
  template() {
    return `
    <div class="d-flex justify-center mt-5 w-100">
    <div class="w-100">
      <header class="my-4" data-component="header">
      {{header}}
      </header>
      <main class="mt-10 d-flex justify-center" data-component="main">
        {{main}}
      </main>
    </div>
  </div>
    `;
  }
  mount() {
    this.addChildComponent(
      new Header({
        key: 'header',
        $parent: this.$component,
        props: {
          menuController: MenuController(
            createCurrentMenuRepository(this.store, {}),
          ),
        },
      }),
    );
    this.addChildComponent(new Main({ key: 'main' }));
  }
}
