import { Component, OnInit } from '@angular/core';
import { WalletService } from '../service/wallet/wallet.service';
import { host } from '../shared/config';
import toast from '../shared/toast';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  accounts: any[]|object = []
  walletBalance: object = {}
  constructor(private WalletService: WalletService) { }

  ngOnInit() {
    const accountUrl = `${host}/v1/wallet/accounts`;
    const balanceUrl = 'v1/wallet/balance';

    this.WalletService.get(accountUrl).subscribe(
      accounts => this.accounts = accounts
    )
    this.WalletService.get(`${host}/${balanceUrl}`).subscribe(
      balance => this.walletBalance = balance
    )
  }

  copyBalance(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    toast('Wallet address copied to clipboard', 3000)
  }

}
