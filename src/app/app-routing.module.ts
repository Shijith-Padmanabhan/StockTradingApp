import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PortfolioComponent} from './portfolio/portfolio.component';
import {StocklistComponent} from './stocklist/stocklist.component';
import {NotFoundComponent} from './not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: '/portfolio', pathMatch: 'full' },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'stocklist', component: StocklistComponent },
  { path: '404', component : NotFoundComponent},
  { path : '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
