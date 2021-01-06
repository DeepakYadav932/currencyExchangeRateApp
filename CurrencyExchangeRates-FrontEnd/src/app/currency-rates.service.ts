import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency } from './models/currency.model';
import { CurrencyRates } from './models/currency-rates.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyRatesService {
  constructor(private http: HttpClient) { }

  // tslint:disable
  private baseExchangeRateApiUrl: string = 'https://api.exchangeratesapi.io/latest';
  private baseAvailableCurrenciesApiUrl: string = 'http://localhost:3000';

  public getCurrencyExchangeRates(currency: string): Observable<CurrencyRates> {
    return this.http.get<CurrencyRates>(`${this.baseExchangeRateApiUrl}?base=${currency}`);
  }

  public getAvailableCurrencies(): Observable<{success: boolean, currencies: Currency[]}> {
    return this.http.get<{success: boolean, currencies: Currency[]}>(`${this.baseAvailableCurrenciesApiUrl}/api/currencies`);
  }
}
