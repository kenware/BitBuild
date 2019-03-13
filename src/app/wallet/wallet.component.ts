import { Component, OnInit } from '@angular/core';
import { WalletService } from '../service/wallet/wallet.service';
import { host } from '../shared/config';
import toast from '../shared/toast';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';

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
    const accountUrl = `${host}/v1/wallet/accounts`;
    const balanceUrl = 'v1/wallet/balance';
    
    this.WalletService.get(`${host}/v1/refresh/token`).subscribe(
      user => this.refreshAuth(user),
      err => this.logout()
    )

    this.WalletService.get(accountUrl).subscribe(
      accounts => this.accounts = accounts
    )
    this.WalletService.get(`${host}/${balanceUrl}`).subscribe(
      balance => this.walletBalance = balance['balance']
    )
  }

  copyBalance(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    toast('Wallet address copied to clipboard', 3000)
  }
  
  logout() {
    this.AuthService.logout()
    this.router.navigate(['/'])
  }

  refreshAuth(user) {
    const { id, guid, token, email } = user;
    this.AuthService.authenticate(id, token, guid, email)
  }
}
