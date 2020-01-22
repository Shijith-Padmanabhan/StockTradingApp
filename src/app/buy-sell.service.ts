import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StocksBought,StocksSold } from './stock';


@Injectable({
  providedIn: 'root'
})
export class BuySellService {
  buyStock(stock){
      return this.http.post<StocksBought>('https://work.setu.co/assignments/stock-ui/123/buy',stock);
  }

  sellStock(stock){
    return this.http.post<StocksSold>('https://work.setu.co/assignments/stock-ui/123/sell',stock);
  }

  constructor(public http:HttpClient) { }
}
