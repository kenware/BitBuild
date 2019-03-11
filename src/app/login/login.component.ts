import { Component, OnInit, EventEmitter } from '@angular/core';
import {MaterializeAction} from "angular2-materialize";
import { host } from '../shared/config';
import { WalletService } from '../service/wallet/wallet.service';
import { Alert } from '../shared/alert';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: String = '';
  password: String = '';
  actions = new EventEmitter<string|MaterializeAction>();
  constructor(private WalletService: WalletService, private AuthService: AuthService, private router: Router) { }
  
  ngOnInit() {
  }
  save(response) {
   console
   const { id, token, guid } = response;
   this.AuthService.authenticate(id, token, guid)
   Alert('Login Success', 'success', {message: 'Login successful'}, 3000)
   this.actions.emit({action:"modal",params:['close']});
   this.router.navigate(['/account'])
  }

  submit() {
    const data = {
      email: this.email,
      password: this.password
    }
    const url = `${host}/v1/auth/login`;
    this.WalletService.post(url, data).subscribe(
      res => this.save(res),
      err => Alert('Login Error', 'error', err.error.errors,3000)
    )
  }
}
