class SlotExample extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode:'open' });
        this.shadowRoot.innerHTML = `
            <style>
                span {
                    background-color: black;
                    color: white;                  
                }
                
                :host {
                    position: relative;
                }

                :host(.bgcolor2) {
                   background-color: #ccc;
                }

                :host(.bgcolor3) {
                    background-color: var(--primary-color, #111); /* if the primary-color variable is not set, then the default value #111 will take */
                 }

                :host-context(p) {
                    font-weight: bold;
                }

                ::slotted(span)
                    border: solid 2px green;
                }               
            </style>            
            <div>Welcome!</div>
            <slot><span>Default Slot in web component!<span></slot>
        `;
    }
}


customElements.define('my-slotexample', SlotExample);