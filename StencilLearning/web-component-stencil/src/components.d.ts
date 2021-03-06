/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MyBasicSideDrawer {
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
    interface MyLoading {
    }
    interface MySideDrawer {
    }
    interface MyStockFinder {
    }
    interface MyStockPrice {
        "stockSymbol": string;
    }
    interface NewComponent {
        "drawer_title": string;
        "open": boolean;
        "testMethod": () => Promise<void>;
    }
}
declare global {
    interface HTMLMyBasicSideDrawerElement extends Components.MyBasicSideDrawer, HTMLStencilElement {
    }
    var HTMLMyBasicSideDrawerElement: {
        prototype: HTMLMyBasicSideDrawerElement;
        new (): HTMLMyBasicSideDrawerElement;
    };
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLMyLoadingElement extends Components.MyLoading, HTMLStencilElement {
    }
    var HTMLMyLoadingElement: {
        prototype: HTMLMyLoadingElement;
        new (): HTMLMyLoadingElement;
    };
    interface HTMLMySideDrawerElement extends Components.MySideDrawer, HTMLStencilElement {
    }
    var HTMLMySideDrawerElement: {
        prototype: HTMLMySideDrawerElement;
        new (): HTMLMySideDrawerElement;
    };
    interface HTMLMyStockFinderElement extends Components.MyStockFinder, HTMLStencilElement {
    }
    var HTMLMyStockFinderElement: {
        prototype: HTMLMyStockFinderElement;
        new (): HTMLMyStockFinderElement;
    };
    interface HTMLMyStockPriceElement extends Components.MyStockPrice, HTMLStencilElement {
    }
    var HTMLMyStockPriceElement: {
        prototype: HTMLMyStockPriceElement;
        new (): HTMLMyStockPriceElement;
    };
    interface HTMLNewComponentElement extends Components.NewComponent, HTMLStencilElement {
    }
    var HTMLNewComponentElement: {
        prototype: HTMLNewComponentElement;
        new (): HTMLNewComponentElement;
    };
    interface HTMLElementTagNameMap {
        "my-basic-side-drawer": HTMLMyBasicSideDrawerElement;
        "my-component": HTMLMyComponentElement;
        "my-loading": HTMLMyLoadingElement;
        "my-side-drawer": HTMLMySideDrawerElement;
        "my-stock-finder": HTMLMyStockFinderElement;
        "my-stock-price": HTMLMyStockPriceElement;
        "new-component": HTMLNewComponentElement;
    }
}
declare namespace LocalJSX {
    interface MyBasicSideDrawer {
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface MyLoading {
    }
    interface MySideDrawer {
    }
    interface MyStockFinder {
        "onMySymbolSelected"?: (event: CustomEvent<string>) => void;
    }
    interface MyStockPrice {
        "stockSymbol"?: string;
    }
    interface NewComponent {
        "drawer_title"?: string;
        "open"?: boolean;
    }
    interface IntrinsicElements {
        "my-basic-side-drawer": MyBasicSideDrawer;
        "my-component": MyComponent;
        "my-loading": MyLoading;
        "my-side-drawer": MySideDrawer;
        "my-stock-finder": MyStockFinder;
        "my-stock-price": MyStockPrice;
        "new-component": NewComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-basic-side-drawer": LocalJSX.MyBasicSideDrawer & JSXBase.HTMLAttributes<HTMLMyBasicSideDrawerElement>;
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "my-loading": LocalJSX.MyLoading & JSXBase.HTMLAttributes<HTMLMyLoadingElement>;
            "my-side-drawer": LocalJSX.MySideDrawer & JSXBase.HTMLAttributes<HTMLMySideDrawerElement>;
            "my-stock-finder": LocalJSX.MyStockFinder & JSXBase.HTMLAttributes<HTMLMyStockFinderElement>;
            "my-stock-price": LocalJSX.MyStockPrice & JSXBase.HTMLAttributes<HTMLMyStockPriceElement>;
            "new-component": LocalJSX.NewComponent & JSXBase.HTMLAttributes<HTMLNewComponentElement>;
        }
    }
}
