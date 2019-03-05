import { Component, OnInit } from '@angular/core';
import { plan, testimonies }  from './data';
import { ExchangeRateService } from '../service/exchange/exchange-rate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  planData = plan;
  testimonies = [];
  selectedExchangeRate = []
  allExchangeRate = [];
  currency = 'USD';
  amount = 0;
  calcultedRate: number | object = 0;
  viewStat: boolean = false;
  
  public lineChartLegend = true;
  public lineChartType = 'line';
  lineChartLabels: any[] = [];
  public lineChartOptions: any = {
    responsive: true
  };
  lineChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ]

  constructor(private ExchangeRate: ExchangeRateService) { }

  public lineChartColors: any[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ]

  ngOnInit() {
    const url = 'ticker'
    this.ExchangeRate.getExchangeRate(url).subscribe(
      rates => this.formatRate(rates)
    )
    this.userTestimony()
  };

  formatRate(rates): void {
    let data = [];
    let [ usa, eur, gbp] = [rates['USD'], rates['EUR'], rates['GBP']]
     usa['abr'] = 'USA';
     eur['abr'] = 'EUR';
     gbp['abr'] = 'GBP';
    this.selectedExchangeRate = [usa, eur, gbp]
    this.allExchangeRate = Object.entries(rates)

    Object.entries(rates).forEach(
      (rate) => {
        this.lineChartLabels.push(rate[0]);
        data.push(rate[1]['last'])
      }
    )
    this.lineChartData = [
      { data, label: 'Exchange Rates'}
    ]
  }

  calculateRate(): void {
    const url = `tobtc?currency=${this.currency}&value=${this.amount}`
    this.ExchangeRate.getExchangeRate(url).subscribe(
      rate => this.calcultedRate = rate
    )
    }
  userTestimony(): void{
    const index1 = Math.floor(Math.random() * 6);
    const index2 = Math.floor(Math.random() * 6);
    const index3 = Math.floor(Math.random() * 6);
    this.testimonies = [testimonies[index1], testimonies[index2], testimonies[index3]];
  }
  viewAllStat(): void{
    this.viewStat = !this.viewStat;
  }
}

