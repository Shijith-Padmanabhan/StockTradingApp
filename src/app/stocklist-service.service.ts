import { Injectable } from '@angular/core';
import {StockList} from './stocklist';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StocklistServiceService {

  getStockList(){
    return this.http.get<StockList>('https://work.setu.co/assignments/stock-ui/stocks');
  }
  constructor(private http : HttpClient) { }
}
