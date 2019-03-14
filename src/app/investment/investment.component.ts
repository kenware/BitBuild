import { Component, OnInit } from '@angular/core';
import { WalletService } from '../service/wallet/wallet.service';
import { host } from '../shared/config';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.scss']
})
export class InvestmentComponent implements OnInit {
  plans: any[] = []
  data: object = {
    test: 'Tester',
    starter: 'Starter',
    investor: 'Investor',
    aInvestor: 'Average Investor',
    pInvestor: 'Premium Investor',
    custom: 'Custom Investor'
  }
  constructor(private WalletService: WalletService) { }

  ngOnInit() {
    const userPlanUrl = `v1/plans?userId=${localStorage.getItem('id')}`
    this.WalletService.get(`${host}/${userPlanUrl}`).subscribe(
      (plans: any []) => this.plans = plans
    )
  }
  
  withdraw(id, planAmount, planPrincipal): void{
     console.log(planAmount)
  }
}
