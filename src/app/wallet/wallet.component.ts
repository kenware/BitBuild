import { Component, OnInit } from '@angular/core';
import { WalletService } from '../service/wallet/wallet.service';
import { host } from '../shared/config';
import toast from '../shared/toast';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';
import { alertWithPromise, Alert } from '../shared/alert';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  accounts: any[]|object = []
  walletBalance: number = 0
  constructor(private WalletService: WalletService, private AuthService: AuthService, private router: Router) { }

  ngOnInit() {
    const balanceUrl = 'v1/wallet/balance';
    
    this.WalletService.get(`${host}/v1/refresh/token`).subscribe(
      user => this.refreshAuth(user),
      err => this.AuthService.logout()
    )
    this.getAccounts()
    this.WalletService.get(`${host}/${balanceUrl}`).subscribe(
      balance => this.walletBalance = balance['balance']
    )
  }

  getAccounts() {
    const accountUrl = `${host}/v1/wallet/accounts`;
    this.WalletService.get(accountUrl).subscribe(
      accounts => this.accounts = accounts
    )
  }

  copyBalance(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    toast('Wallet address copied to clipboard', 3000)
  }

  refreshAuth(user) {
    const { id, guid, token, email } = user;
    this.AuthService.authenticate(id, token, guid, email)
  }

  async generateAddress(){
    const title = 'Enter Wallet Address Name'
   const name = await alertWithPromise(title)
   if (name) {
    const url = `${host}/v1/wallet/accounts`;
    this.WalletService.post(url, {name}).subscribe(
      account => this.getAccounts(),
      error => Alert('Info', 'error', {m: 'Error occured generating account'}, 3000)
    )
   }
  }

}
