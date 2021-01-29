class ConfirmLink extends HTMLAnchorElement {
    connectedCallback() {
        this.addEventListener('click', event => {
            if (!confirm("Do you want to go?")) {
                event.preventDefault();
            }
        })
    }
}

customElements.define('my-confirm-link', ConfirmLink, {extends: 'a'}); // This custom tag extends the build in <a> tag