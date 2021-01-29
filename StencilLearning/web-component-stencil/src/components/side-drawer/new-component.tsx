import { Component, h, Prop, State, Method } from "@stencil/core";

@Component({
    tag: 'new-component',
    styleUrl: 'new-component.css',
    shadow: true,
})

export class NewComponent {
    @State() showContactInfo: boolean; // If it change only inside the component, then use state
    @Prop({reflect: true}) drawer_title: string;
    @Prop({reflect: true, mutable: false}) open: boolean; 

    // If the property of the component is set to 'open' then it will visible
    //@Prop() open: boolean; 
    // render() {
    //     let content = null;
    //     if(this.open) {
    //         content = (
    //             <aside>
    //                 <header><h1>{this.drawer_title}</h1></header>
    //                 <main>
    //                     <slot/>
    //                 </main>
    //             </aside> 
    //         );
    //     }
    //     return content;
    // }

    CloseSideBar() {
        this.open = false;
    }

    onContentChange(content: string) {
        console.log(content);
        this.showContactInfo = content === "contact";
    }

    @Method()
    testMethod() {
        console.log('method from the component..');
    }

    render() {
        let mainContent = <slot/>
        if (this.showContactInfo) {   
            mainContent = (
                <div id="contact-info">
                    <h2>Contact Information</h2>
                    <p>Contact information will be here....</p>
                </div>
            );
        }
        return [
            <div class="backdrop" onClick={this.CloseSideBar.bind(this)}></div>,
            <aside>
                <header>
                    <h1>{this.drawer_title}</h1>
                    <button onClick={this.CloseSideBar.bind(this)}>X</button>
                </header>
                <section id="tabs">
                    <button class={!this.showContactInfo ? 'active' : ''} onClick={this.onContentChange.bind(this,'navigation')}>Navigation</button>
                    <button class={this.showContactInfo ? 'active' : ''} onClick={this.onContentChange.bind(this,'contact')}>Contact</button>
                </section>
                <main>
                    {mainContent}
                </main>
            </aside> 
        ];
    }
}


