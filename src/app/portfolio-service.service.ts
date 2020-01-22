import { Injectable } from '@angular/core';
import {Portfolio} from './portfolio';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PortfolioServiceService {

  private PFUrl = 'https://work.setu.co/assignments/stock-ui/123/portfolio';

  //  getPortfolio (): Observable<Portfolio[]> {
  //    return this.http.get<Portfolio[]>(this.PFUrl)
  //  }

  constructor(private http: HttpClient) { }

  getPortfolio(){
    return this.http.get<Portfolio>('https://work.setu.co/assignments/stock-ui/123/portfolio');
  }
}
