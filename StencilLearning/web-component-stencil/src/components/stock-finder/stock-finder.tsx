import { Component, h, State, Event, EventEmitter } from "@stencil/core";
import { API_KEY } from '../../common/common';

@Component({
    tag: 'my-stock-finder',
    styleUrl: 'stock-finder.css',
    shadow: true
})

export class StockFinder {
    stockNameInput: HTMLInputElement
    @State() searchResults: {symbol: string, name: string}[] = [];
    @State() loading = false;
    @Event({bubbles: true, composed: true}) mySymbolSelected: EventEmitter<string>;

    onFindStocks(event: Event) {
        event.preventDefault();
        this.loading = true;
        const stockName = this.stockNameInput.value;
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${API_KEY}`)
        .then(response => response.json())
        .then(parseResponse => {
            console.log(parseResponse);
            this.searchResults = parseResponse['bestMatches'].map(match => {
                return {name:match['2. name'], symbol: match['1. symbol']};
            });
            this.loading = false;
        })
        .catch(err => {
            console.log(err);
            this.loading = false;
        });
    }

    onSelectSymbol(symbol:string) {
        this.mySymbolSelected.emit(symbol);
    }

    render() {
        let content = <ul>{this.searchResults.map(result => (
            <li onClick={this.onSelectSymbol.bind(this,result.symbol)}>
                {result.name}
            </li>
        ))}</ul>;        
        if(this.loading) {
            content = <my-loading/>;
        }         
        return [
            <form onSubmit={this.onFindStocks.bind(this)}>
                <input id="stock-symbol" ref={ele => this.stockNameInput = ele}></input>
                <button type="submit">Fetch</button>
            </form>,
            content
        ];
    }    
}