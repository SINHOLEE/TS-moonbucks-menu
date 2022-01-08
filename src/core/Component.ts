import getSingletonStore from '../modules/getSingletonStore';
import { $, addEvent } from '../utils/util';

export type BindEvent = {
  eventType: string;
  callback: EventListenerOrEventListenerObject;
};
interface CoreComponent {
  template: () => string;
  mount?: () => void;
  bindEvents?: () => Array<BindEvent>;
  render: () => void;
}

/**
 * 문제: mount시 새로운 인스턴스를 계속 생성하면서 생기는 메모리 낭비
 * 해결방법:
 * 1. 인스턴스 생성과 랜더를 쪼갠다.
 * 2. 생성: mount -> child components 관리
 * 3. 생성시 subscribe하기...
 *
 * */
export default class Component implements CoreComponent {
  private key: string;
  protected store;
  protected $component: HTMLElement;
  private prevTemplate: string;
  private prevNode: Node;
  private childComponents: CoreComponent[] = [];
  protected $parent;
  protected props;
  private static keyBucket: Set<string> = new Set();
  constructor({
    key,
    $parent,
    props,
  }: {
    key: string;
    $parent?: HTMLElement;
    props?: Record<string, any>;
  }) {
    this.key = key;
    // this._setupKey(this.key);
    if ($parent === undefined) {
      this.$parent = $('body');
    }
    this.prevTemplate = 'empty';
    this.$parent = $parent;
    this.$component = $(`[data-component=${this.key}]`, this.$parent);
    this.props = props;
    this.store = getSingletonStore();
    /**
     * store문제...
     * 만약 menuItem을 하나 추가했다 치면 해당 랜더함수는 unsubscribe하지 않고 계속 listener에서 가지고 있기 때문에
     * 메모리관리 실패...
     * */
    this.store.subscribe(this.key, this.render.bind(this));
    this.$component.innerHTML = this.template();
    this?.mount();
    this.prevNode = this.$component.cloneNode(true);
    this.prevTemplate = this.$component.innerHTML;
    this.setEvents();
  }
  _setupKey(key: string) {
    if (Component.keyBucket.has(key)) {
      throw new Error('Component는 중복된 키값을 가질 수 없습니다.');
    } else {
      Component.keyBucket.add(key);
    }
  }
  addChildComponent(component: CoreComponent) {
    this.childComponents.push(component);
  }
  template() {
    throw new Error(`${this.key} template should return dom text`);
    return '';
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  mount() {}
  render() {
    // 쉬운 diff 실패...
    if (this.prevTemplate === this.template()) {
      console.log(`same`, this.key);
      this.$component = this.prevNode as HTMLElement;
    } else {
      console.log('same2', this.key);

      this.$component.innerHTML = this.template();
      this?.mount();
      this.prevTemplate = this.$component.innerHTML;
      this.childComponents.forEach(component => {
        component.render();
      });
      this.prevNode = this.$component.cloneNode(true);
    }
  }

  bindEvents() {
    return [] as BindEvent[];
  }

  setEvents() {
    this.bindEvents().forEach(({ eventType, callback }) => {
      addEvent(this.$component, eventType, callback);
    });
  }
}
