class ToogleButton extends HTMLElement {
    constructor() {        
        super();
        this._is_hidden_text = 'hide';
        this.attachShadow({ mode:'open' });
        this.shadowRoot.innerHTML = `
            <style>
                p {
                    display: none;
                }
            </style>           
            <button>Show Text</button>
            <p><slot>Default More infos!</slot></p>            
        `;
    }

    connectedCallback() {
        if (this.hasAttribute('text-state')) {
            this._is_hidden_text = this.getAttribute("text-state");
        }        
        const btn = this.shadowRoot.querySelector('button');
        const infoEl = this.shadowRoot.querySelector('p');
        btn.addEventListener('click', () => {
            console.log(this._is_hidden_text);
            if (this._is_hidden_text == 'show') {
              infoEl.style.display = 'block';
              btn.textContent = 'Hide Text';
              this._is_hidden_text = "hide";
            } else {
              infoEl.style.display = 'none';
              btn.textContent = 'Show Text';
              this._is_hidden_text = "show";
            }
          });
    }
}

customElements.define('my-toogle-button', ToogleButton);