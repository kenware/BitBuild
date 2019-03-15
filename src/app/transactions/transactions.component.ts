import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExchangeRateService } from '../service/exchange/exchange-rate.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private Transaction: ExchangeRateService) { }
  address: string = ''
  transaction: any = { }

  ngOnInit() {
    const address = this.route.snapshot.paramMap.get('address');
    this.address= address;
    const url = `rawaddr/${address}?cors=true`;
    this.Transaction.getExchangeRate(url).subscribe(
      transaction => this.transaction = transaction
    )
  }
}