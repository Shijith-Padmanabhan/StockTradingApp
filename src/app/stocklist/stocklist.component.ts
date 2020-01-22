import { Component, OnInit } from '@angular/core';
import {StockList} from '../stockList';
import {StocklistServiceService} from '../stocklist-service.service';
import {BuySellService} from '../buy-sell.service';
import {StocksBought,StocksSold, StocksToBuy,StocksToSell} from '../stock';

@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.css']
})
export class StocklistComponent implements OnInit {
  stocks : StockList;
  stocksToBuy: StocksToBuy = {stockId : "",unitsToBuy:1 };
  stocksToSell : StocksToSell = {stockId : "",unitsToSell:1};;
  stocksBought : StocksBought;
  stocksSold : StocksSold;
  flag : number = 0;
  prevValue : Number[]=[0,0,0,0,0,0,0,0,0,0];
  i : number;
  selectedStock : string[]=[];
  buyerror : number = 0;
  sellerror : number = 0;
  inputValue:number;
  intervalValue:number=5000;
  emptyError : number = 0;

  constructor(private stocklistservice : StocklistServiceService, private buysellservice : BuySellService) { }

  ngOnInit() {
    this.getStocksList();

    setInterval(()=>{this.getStocksList();},this.intervalValue);
}
  intervalSetter(){
    if(this.inputValue>0){
      this.intervalValue = this.inputValue*1000;
    }
  }
  setClass(id){
    return this.selectedStock.some((item) => item == id);
  }

  onSelect(id){
    var index : number = this.selectedStock.indexOf(id);
    if(index != -1){
      this.selectedStock.splice(index,1);
      
    }
    else{
      this.selectedStock.push(id);
      
    }
    console.log(this.selectedStock);
    }

    
   

  setIndicator(currValue, prevValue,i):void{
    //console.log(prevValue,i);
    if((currValue-prevValue)<0){
      this.stocks.data[i].indicatorURL='../assets/red arrow.png';
    }
    else if((currValue-prevValue)==0){
      this.stocks.data[i].indicatorURL='../assets/yellow line.png';
    }
    else{
      this.stocks.data[i].indicatorURL='../assets/green arrow.png';
    }
  }

  getStocksList(): void{
    this.stocklistservice.getStockList().subscribe(data=>{
      this.stocks = data;
      console.log("stocks loaded");
      
      for( var i=0;i<this.stocks.data.length;i++){
        if(this.flag == 0){
            this.prevValue[i] = 0;
            this.stocks.data[i].indicatorURL = '';
            this.flag = 1;
        }
        this.setIndicator(this.stocks.data[i].price,this.prevValue[i],i);
        this.prevValue[i] = this.stocks.data[i].price;
      }
      
    },
    err=>{
      if(err.status==500){
        this.getStocksList();
      };
      
    });
  }

  buyStock(){

    if(!this.selectedStock.length){
      this.emptyError = 1;      
    }
    else{
      this.emptyError = 0; 
    }
    console.log('this //',this.selectedStock);
  
    for(var i=0;i<this.selectedStock.length;i++){
      var stockObject = {stockId : this.selectedStock[i],unitsToBuy : 1};
      console.log(stockObject);
      this.buysellservice.buyStock(stockObject).subscribe(data=>
        {
         
          this.stocksBought = data;
          console.log('bought : ',data);
          alert('Bought!');
          this.buyerror = 0;
        },
        err=>{
         if(err.status == 403){
            this.buyerror = 1;
          }
          else if(err.status == 500){
            this.buyStock();
           
          }
          else{
            this.buyStock();
          }
         
          
        }); 
    }  
    if(i>=this.selectedStock.length){
      this.selectedStock = [];
      console.log('after buying', this.selectedStock);
    }
        
  }

  sellStock(){
    if(!this.selectedStock.length){
      this.emptyError = 1;      
    }
    else{
      this.emptyError = 0; 
    }
    var i = 0;
    for(i=0;i<this.selectedStock.length;i++){
      var stockObject = {stockId : this.selectedStock[i],unitsToSell : 1};
      console.log(stockObject);
      this.buysellservice.sellStock(stockObject).subscribe(data=>
        {
          this.stocksSold = data;
          console.log('sold : ',data);
          alert('Sold!');
          this.sellerror = 0;
        },
        err=>{
          if(err.status == 403){
            this.sellerror = 1;
          }
          else if(err.status == 500){
            this.sellStock();
          }
          else{
            this.sellStock();
          }
          
        }); 
    }  
    if(i>=this.selectedStock.length){
        this.selectedStock = [];
        console.log('after selling', this.selectedStock);
        }
  }
   

}
