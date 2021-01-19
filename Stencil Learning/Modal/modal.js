class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.isOpen = false;
        this.shadowRoot.innerHTML = `
            <style>
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0,0,0,0.75);
                    z-index: 10;
                    opacity: 0;
                    pointer-events: none;
                }
                :host([opened]) #backdrop,
                :host([opened]) #modal {
                    opacity: 1;
                    pointer-events: all;
                }
                :host([opened]) #modal {
                    top: 15vh;
                }
                ::slotted(h1) {
                    color: green;
                    margin: 0;
                }
                #modal {
                    position: fixed;
                    top: 10vh;
                    left: 25%;
                    width: 50%;
                    z-index: 100;
                    background-color: white;
                    border-radius: 3px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.26);      
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between; 
                    opacity: 0;
                    pointer-events: none;    
                    transition: all 0.3s ease-out;         
                }
                header {
                    padding: 1rem;
                    border-bottom: solid 1px #ccc;
                }
                #main {
                    padding: 1rem;

                }
                #actions {
                    border-top: solid 1px #ccc;
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-end; 

                }
                #actions button {
                    margin: 0 1rem;
                }
            </style>
            <div id='backdrop'></div>
            <div id='modal'>
                <header>
                    <slot name="title">Default heading...</slot> 
                </header>
                <section id='main'>
                    <slot></slot>
                </section>
                <section id='actions'>
                    <button id='btnCancel'>Cancel</button>
                    <button id='btnOkay'>Okay</button>
                </section>
            </div>
        `;
        const slots = this.shadowRoot.querySelectorAll('slot');
        slots[1].addEventListener('slotchange', event => {
            //console.dir(slots[1]);
            console.dir(slots[1].assignedNodes());
        });
        const backdrop = this.shadowRoot.querySelector("#backdrop");        
        const cancelBtn = this.shadowRoot.querySelector('#btnCancel');
        const OkayBtn = this.shadowRoot.querySelector('#btnOkay');
        cancelBtn.addEventListener('click', this._cancel.bind(this));
        OkayBtn.addEventListener('click', this._okay.bind(this));
        cancelBtn.addEventListener('CANCEL', () => {
            console.log("cancel inside the component");
        });
        backdrop.addEventListener('click',this._cancel.bind(this));        
    }

    // attributeChangedCallback(name, oldValue, newValue) {
    //     if(name === "opened") {
    //         if(this.hasAttribute('opened')) {
    //             this.shadowRoot.querySelector('#backdrop').style.opacity = 1;
    //             this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'all';
    //             this.shadowRoot.querySelector('#modal').style.opacity = 1;
    //             this.shadowRoot.querySelector('#modal').style.pointerEvents = 'all';
    //         }
    //     }
    // }

    // static get observedAttributes() {
    //     return ['opened'];
    // }

    open() {
        this.setAttribute('opened', '');
        this.isOpen = true;
    }

    hide() {
        if(this.hasAttribute('opened')) {
            this.removeAttribute('opened');
        }
        this.isOpen = false;
    }

    _cancel(event) {
        this.hide();
        const cancelEvent = new Event('CANCEL', {bubbles: true, composed: true}); /* by default the bubbles and composed are false. Composed indicates bubbles outside the component */
        event.target.dispatchEvent(cancelEvent);
    }

    _okay() {
        this.hide();
        const okEvent = new Event('CONFIRM');
        this.dispatchEvent(okEvent);
    }
}

customElements.define('my-modal', Modal);