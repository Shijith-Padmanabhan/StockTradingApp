import { Component, OnInit } from '@angular/core';
import {Portfolio} from '../portfolio';
import { PortfolioServiceService } from '../portfolio-service.service';



@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolios : Portfolio;

  constructor(private portfolioService : PortfolioServiceService) {
    
   }

  ngOnInit() {
    this.getPortfolio();
    setInterval(()=>{
      this.getPortfolio();
    },5000);
  }

  getPortfolio(): void{
    this.portfolioService.getPortfolio().subscribe(portf=>{
      this.portfolios = portf;
    },
    err =>{
      console.log('HTTP Error', err);
      this.getPortfolio();
    } ,
    );
  }

}
