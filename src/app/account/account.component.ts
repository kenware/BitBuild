import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  token: any = localStorage.getItem('accessToken')
  constructor() { }

  ngOnInit() {
  }

}
