export function getUUID(): string {
  // UUID v4 generator in JavaScript (RFC4122 compliant)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 3) | 8;
    return v.toString(16);
  });
  // 출처: https://goni9071.tistory.com/209 [고니의꿈]
}

type Dollar = (selector: string, target: Document) => Element;

export const $: Dollar = (selector, target = window.document) => {
  const el = target.querySelector(selector);
  if (el === null) {
    throw new Error('$ should return HTMLElement not undefined');
  }
  return el;
};
export function addEvent(
  el: HTMLElement,
  eventType: string,
  listener: EventListenerOrEventListenerObject,
): void {
  el.addEventListener(eventType, listener);
}
