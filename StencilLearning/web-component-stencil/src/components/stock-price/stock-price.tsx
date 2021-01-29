import { Component, h, State, Element } from "@stencil/core";
import { API_KEY } from '../../common/common';

@Component({
    tag: 'my-stock-price',
    styleUrl: 'stock-price.css',
    shadow: true
})

export class StockPrice {
    stockInput: HTMLInputElement;
    @Element() ele: HTMLElement;
    @State() fetchedPrice: number;   
    @State() stockUserInput: string;
    @State() stockInputValid = false;
    @State() errorMsg: string;

    onUserInput(event: Event) {
        this.stockUserInput = (event.target as HTMLInputElement).value;
        if(this.stockUserInput.trim() !== '') {
            this.stockInputValid = true;
        }
        else {
            this.stockInputValid = false;
        }
    }

    fetchStockPrice(event: Event) {
        event.preventDefault();
        console.log('Submit...');
        //const stockSymbol = (this.ele.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
        const stockSymbol = this.stockInput.value;
        //fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo")
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`)
        .then(res => {
            if(res.status !== 200) {
                throw new Error('Invalid!')
            }
            return res.json();            
        })
        .then(pr => {
            if(!pr['Global Quote']['05. price']) {
                throw new Error('Invalid Symbol!')
            }
            this.errorMsg = null;
            this.fetchedPrice = +pr['Global Quote']['05. price'];
            console.log(this.fetchedPrice);
        })
        .catch(err => {
            console.log(err);
            this.errorMsg = err.message;
        });
    }

    render() {
        let dataContent = <p>Please enter a symbol IMB or AAPL!</p>;
        if(this.errorMsg) {
            dataContent = <p>{this.errorMsg}</p>;    
        }
        if(this.fetchedPrice) {
            dataContent = <p>Price: {this.fetchedPrice}</p>;
        }
        return [
            <form onSubmit={this.fetchStockPrice.bind(this)}>
                <input 
                    id="stock-symbol" 
                    ref={ele => this.stockInput = ele}
                    value={this.stockUserInput}
                    onInput={this.onUserInput.bind(this)}
                ></input>
                <button type="submit" disabled={!this.stockInputValid}>Fetch</button>
            </form>,
            <div>
                {dataContent}
            </div>
        ];
    }
}