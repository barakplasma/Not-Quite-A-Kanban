declare module "symbol-tree" {
  export default class SymbolTree {
    constructor();
    insertBefore(a: Object, b: Object): void;
    insertAfter(a: Object, b: Object): void;
    nextSibling(obj: {}): any;
    previousSibling(obj: {}): any;
  }
}
