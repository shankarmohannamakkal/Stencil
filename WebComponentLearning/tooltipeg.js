class Tooltip extends HTMLElement {
    constructor() {
        // DOM access is not happend here
        super();
        console.log("It is working");
        //this._tooltipContainer;
        this._tooltipIcon;
        this._tooltipVisible = false;
        this._tooltipText = "Default tooltip";   
        this.attachShadow({ mode:'open' });
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    background-color: black;
                    color: white;
                    position: absolute;
                    z-index: 10;
                }
            </style>
            <slot>Default Tooltip</slot>
            <span> (?)</span>
        `;
    }

    // Sidenote: Attribute changes don't get picked up because we got no logic for that in the component. 
    // The "text" attribute is extracted in connectedCallback (i.e. when the component gets mounted to the DOM) only.

    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute("text");
        }
        this._tooltipIcon = this.shadowRoot.querySelector('span');
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this._render();
    }

    attributeChangedCallback(name, oldvalue, newvalue) {
        console.log(name, oldvalue, newvalue);
        if(oldvalue === newvalue) {
            return;
        }
        if(name === 'text') {
            this._tooltipText =  newvalue;
        }
    }

    disconnectedCallback() {
        // if the component deleted in dev tool bar, this will execute
        console.log("disconnected...");
        // cleanup code will come here
        this._tooltipIcon.removeEventListener('mouseenter',this._showTooltip);
        this._tooltipIcon.removeEventListener('mouseleave',this._hideTooltip);
    }

    static get observedAttributes() { // only getter and can't set
        return ['text'] // name of the attributes need observed, it can be many in this array.
    }

    _render() {
        let tooltipContainer = this.shadowRoot.querySelector('div');
        if(this._tooltipVisible) {
            this.tooltipContainer = document.createElement('div');
            this.tooltipContainer.textContent = this._tooltipText;
            this.shadowRoot.appendChild(this.tooltipContainer);
        }
        else {
            if(tooltipContainer) {
                this.shadowRoot.removeChild(this.tooltipContainer);
            }
        }
    }

    _showTooltip() {
        // this._tooltipContainer = document.createElement('div');
        // this._tooltipContainer.textContent = this._tooltipText;
        // this.shadowRoot.appendChild(this._tooltipContainer);
        this._tooltipVisible = true;
        this._render();
    }

    _hideTooltip() {        
        //this.shadowRoot.removeChild(this._tooltipContainer);
        this._tooltipVisible = false;
        this._render();
    }
    
}

customElements.define('my-tooltip', Tooltip);