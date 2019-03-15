import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { WalletComponent } from './wallet/wallet.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { InvestmentComponent } from './investment/investment.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'account', component: AccountComponent
  },
  {
    path: 'account/wallet', component: WalletComponent
  },
  {
    path: 'wallet/transactions/:address', component: TransactionsComponent
  },
  {
    path: 'account/investments', component: InvestmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
