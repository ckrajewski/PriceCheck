import React from "react";

class CurencyFormatter {
    constructor(currency) {
        this.currency = currency;
    }
    format() {
        let currency = this.currency;
        const currencySymbol="$";
        if (currency.charAt(0) === currencySymbol) {
            currency = currency.split(currencySymbol)[1];
        }
        const indexToInsertComma = currency.length % 3;
        if(currency.length === 4){
            currency = currency.substring(0,indexToInsertComma) +"," + currency.substring(indexToInsertComma);
        }
        return currencySymbol + currency;
    }
}

export default class Currency extends React.Component {

    handleCurrencyDisplay = (event) => {
        const currency = event.target.value;
        let formattedCurrency = new CurencyFormatter(currency);
        event.target.value = formattedCurrency.format();
    }
    render() {
        return (
            <div className="PriceCheckContainer">
            <input onChange={this.handleCurrencyDisplay}/>
            </div>
        );
    }
}