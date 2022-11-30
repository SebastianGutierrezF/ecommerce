import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  // baseUrl = 'https://enefty-webservice.herokuapp.com/controller/';
  baseUrl = 'http://localhost/enefty-webservice/controller/';
  usd = 0;

  constructor(private http: HttpClient) { }

  get(model: string, action: string) {
    return this.http.get(`${this.baseUrl}${model}.php?option=${action}`);
  }

  post(model: string, action: string, datos: any) {
    return this.http.post(`${this.baseUrl}${model}.php?option=${action}`, datos);
  }

  getPrice() {
    this.http.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=36a206106342ddcb3895c50426b8ab4af628fd38e08ab3b4439950269ec592a6').subscribe((price: any) => {      
      if (price) {
        this.usd = price.USD;
      }
    })
  }
}
