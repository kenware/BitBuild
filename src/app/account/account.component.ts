import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ExchangeRateService } from '../service/exchange/exchange-rate.service';
import { AuthService } from '../service/auth/auth.service';
import { WalletService } from '../service/wallet/wallet.service';
import { host } from '../shared/config';
import { Alert } from '../shared/alert';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  historicalData: object = {}
  lineChartLabels: any[] = [];
  lineChartData: any[] = [ { data: [], label: 'Series A' },]
  balance: number = 0;
  totalUserPlan: number = 0
  currentRate: number|object = 0
  customPrice: number = null
  plan: string = 'test'
  principal: number
  isCustom: boolean = false
  @ViewChild('historical') public historical:ElementRef

  planData: object = {
    test: 100, starter: 500, investor: 1000,
    aInvestor: 5000, pInvestor: 10000, custom: this.customPrice
  }
  constructor(private HistoricalPrice: ExchangeRateService,
    private AuthService: AuthService, private WalletService: WalletService,
    private router: Router) { }
  
  ngOnInit() {
    const historicalUrl = 'charts/market-price?timespan=1weeks&format=json&cors=true';
    const balanceUrl = 'v1/wallet/balance';
    const url = 'ticker'

    this.WalletService.get(`${host}/v1/refresh/token`).subscribe(
      user => this.refreshAuth(user),
      err => this.AuthService.logout()
    )
  
    this.HistoricalPrice.getExchangeRate(historicalUrl).subscribe(
      data => this.formatData(data)
    )
    this.WalletService.get(`${host}/${balanceUrl}`).subscribe(
      balance => this.balance = balance['balance']
    )
    this.getPlan();
    this.HistoricalPrice.getExchangeRate(url).subscribe(
      rate => this.currentRate = rate['USD']['last']
    )
  };
  getPlan() {
    const userPlanUrl = `v1/plans?userId=${localStorage.getItem('id')}`
    this.WalletService.get(`${host}/${userPlanUrl}`).subscribe(
      (plan: any []) => this.totalUserPlan = plan.length
    )
  }

  refreshAuth(user) {
    const { id, guid, token, email } = user;
    this.AuthService.authenticate(id, token, guid, email)
  }

  formatDate(number) {
    if (number < 10) {
      return `0${number}`;
    }
    return number;
  }
  formatData(priceData) {
    const data = []
    priceData.values.forEach(priceObject => {
      const date = new Date(priceObject.x*1000)
      const month = this.formatDate(date.getMonth()+1);
      const day = this.formatDate(date.getDate());
      this.lineChartLabels.push(`${date.getFullYear()}-${month}-${day}`)
      data.push(priceObject.y)
    });
    this.lineChartData = [{ data, label: 'Historical Price($ USD)'}]
  }

  selectPlan(plan) {
    if (plan ==='custom') {
    this.isCustom = true
    } else {
      this.isCustom = false
      this.customPrice = null
    }
  }
  createPlan(data) {
    this.WalletService.post(`${host}/v1/plans`, data).subscribe(
      plan => { this.getPlan();
        Alert('success', 'success', { m: `You have successfully invested in <b>${plan['name']}</b> plan`}, 4000);
      }
    )
  }

  invest() {
    let principal = this.planData[this.plan];
    const name = this.plan;
    if (name == 'custom') {
      principal = this.customPrice;
    }
    if (!principal) {
      const message = { message: '<font color="red">You must specify amount you want to invest for <b>custom plan</b></font>'}
      Alert('Info!', 'error', message, 5000)
    }
    this.principal = principal
    if(this.balance === 0) {
      const message = {
        m1: 'You have a zero balance in your wallet',
        m2: 'Please fund your wallet before investing'
      }
      Alert('success', 'success', message, 4000);
    }
    const url = `tobtc?currency=USD&value=${principal}&cors=true`;
    this.HistoricalPrice.getExchangeRate(url).subscribe(
      amount => {
        if(this.balance <= amount){
          const message = { m1: 'You dont have a sufficient amount to invest in this plan.' }
          Alert('success', 'success', message, 4000);
          return;
        }
        this.WalletService.post(`${host}/v1/wallet/send`, { amount }).subscribe(
        success => this.createPlan({name: this.plan, principal: this.principal}),
        error => Alert('error', 'error', error.error.errors, 3000)
      )}
    )
  }
  public moveToStructure():void {
    this.historical.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
}
}
// Dehydrogenase12