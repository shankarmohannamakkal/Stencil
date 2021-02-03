import { Component, h } from "@stencil/core";

@Component({
    tag: 'my-loading',
    styleUrl: 'my-loading.css',
    shadow: true
})


export class Loading {
    render() {
        return (
            <div class='load'>loading...</div>
        );
    }
}