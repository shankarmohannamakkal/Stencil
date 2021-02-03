import { Component, h, State, Element, Prop, Watch, Listen } from "@stencil/core";
import { API_KEY } from '../../common/common';

@Component({
    tag: 'my-stock-price',
    styleUrl: 'stock-price.css',
    shadow: true
})

export class StockPrice {
    stockInput: HTMLInputElement;
    // initialStockSymbol: string;
    @Element() ele: HTMLElement;
    @State() fetchedPrice: number;   
    @State() stockUserInput: string;
    @State() stockInputValid = false;
    @State() errorMsg: string;
    @State() loading = false;
    @Prop({mutable:true,reflect:true}) stockSymbol: string;
    

    @Watch('stockSymbol') // we can add multiple watch
    stockSymbolChanged(newValue: string, oldValue: string) {
        if(newValue !== oldValue) {
            this.stockUserInput = newValue;
            this.stockInputValid = true;
            this.fetchStockPriceFromAPI(newValue);
        }
    }

    // Stencil life cycle event. When ever this web component loaded to the DOM, but the render is not happend.
    componentWillLoad() {
        // if requried, do all the initialize before render
        console.log("componentWillLoad");
        console.log(this.stockSymbol);
    }

    // Stencil life cycle event. When ever this web component loaded to the DOM
    componentDidLoad() {
        console.log("componentDidLoad");
        console.log(this.stockSymbol);        
        if(this.stockSymbol) {
            // this.initialStockSymbol = this.stockSymbol;
            this.stockUserInput = this.stockSymbol;
            this.stockInputValid = true;
            this.fetchStockPriceFromAPI(this.stockSymbol);
        }
    }

    // will call when component about to update
    componentWillUpdate() {
        console.log("componentWillUpdate");
    }

    // will call when component is updated
    componentDidUpdate() {
        console.log("componentDidUpdate");
        // if(this.stockSymbol != this.initialStockSymbol) {
        //     this.initialStockSymbol = this.stockSymbol;
        //     this.fetchStockPriceFromAPI(this.stockSymbol);
        // }
    }

    // will call when component is unload
    // use this for any cleanup resources
    disconnectedCallback() {
        console.log("disconnectedCallback");
    }    

    onUserInput(event: Event) {
        this.stockUserInput = (event.target as HTMLInputElement).value;
        if(this.stockUserInput.trim() !== '') {
            this.stockInputValid = true;
        }
        else {
            this.stockInputValid = false;
        }
    }

    @Listen('mySymbolSelected', {target:'body'})
    onStockSymbolSelected(event: CustomEvent) {
        console.log('stock symbol selected: ' + event.detail);
        if (event.detail && event.detail !== this.stockSymbol) {
            this.stockSymbol = event.detail;
        }
    }

    fetchStockPrice(event: Event) {
        event.preventDefault();
        console.log('Submit...');
        this.stockSymbol = this.stockInput.value;
        //const stockSymbol = (this.ele.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
        //const stockSymbol = this.stockInput.value;
        //fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo")
        //this.fetchStockPriceFromAPI(stockSymbol);
    }

    fetchStockPriceFromAPI(stockSymbol: string) {
        this.loading = true;
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Invalid!');
                }
                return res.json();
            })
            .then(pr => {
                if (!pr['Global Quote']['05. price']) {
                    throw new Error('Invalid Symbol!');
                }
                this.errorMsg = null;
                this.fetchedPrice = +pr['Global Quote']['05. price'];
                console.log(this.fetchedPrice);
                this.loading = false;
            })
            .catch(err => {
                console.log(err);
                this.errorMsg = err.message;
                this.fetchedPrice = null;
                this.loading = false;
            });
    }

    // Special method in stencil
    // It's used to add conidtional data to the host
    hostData() {
        return { class: this.errorMsg ? 'error' : ''};
    }

    render() {
        let dataContent = <p>Please enter a symbol IMB or AAPL!</p>;
        if(this.errorMsg) {
            dataContent = <p>{this.errorMsg}</p>;    
        }
        if(this.fetchedPrice) {
            dataContent = <p class='price'>Price: {this.fetchedPrice}</p>;
        }
        if(this.loading) {
            dataContent = <my-loading></my-loading>;
        }
        return [
            <form onSubmit={this.fetchStockPrice.bind(this)}>
                <input 
                    id="stock-symbol" 
                    ref={ele => this.stockInput = ele}
                    value={this.stockUserInput}
                    onInput={this.onUserInput.bind(this)}
                ></input>
                <button type="submit" disabled={!this.stockInputValid || this.loading}>Fetch</button>
            </form>,

            <div>
                {dataContent}
            </div>
        ];
    }
}