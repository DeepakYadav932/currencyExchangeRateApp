import { Component, OnInit } from '@angular/core';
import { CurrencyRatesService } from '../currency-rates.service';
import { CurrencyRates } from '../models/currency-rates.model';
import { Currency } from '../models/currency.model';

@Component({
  selector: 'app-currency-exchange-rate',
  templateUrl: './currency-exchange-rate.component.html',
  styleUrls: ['./currency-exchange-rate.component.css'],
})
export class CurrencyExchangeRateComponent implements OnInit {
  constructor(private currencyService: CurrencyRatesService) {}

  // tslint:disable-next-line: no-inferrable-types
  public selectedCurrency: string = 'INR';
  public availableCurrencies: Currency[] = [];
  public currencyExchangeRates: CurrencyRates = {} as CurrencyRates;
  public otherAvailableCurrencies: string[] = [];

  public ngOnInit(): void {
    this.currencyService.getAvailableCurrencies().subscribe((data) => {
      this.availableCurrencies = data.currencies;
      this.currencyService
        .getCurrencyExchangeRates(this.selectedCurrency)
        .subscribe((res) => {
          this.currencyExchangeRates = this.getCurrencyRates(res);
        });
    });
  }

  public onCurrencyChange(): void {
    this.currencyService
        .getCurrencyExchangeRates(this.selectedCurrency)
        .subscribe((res) => {
          this.currencyExchangeRates = this.getCurrencyRates(res);
        });
  }

  public getCurrencyRates(currencyRates: CurrencyRates): CurrencyRates {
    this.otherAvailableCurrencies = this.availableCurrencies
                                        .map((currency) => currency.abbrevation)
                                        .filter((abbrevation) => abbrevation !== this.selectedCurrency);
    const rates = {};
    for (const currency of this.otherAvailableCurrencies) {
      rates[currency] = currencyRates.rates[currency];
    }
    const currencyExchangeRates = {
      rates,
      base: currencyRates.base,
      date: currencyRates.date,
    };
    return currencyExchangeRates;
  }
}
