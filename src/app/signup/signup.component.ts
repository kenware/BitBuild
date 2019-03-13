import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import Validator from 'validatorjs';
import { Alert } from '../shared/alert';
import { WalletService } from '../service/wallet/wallet.service';

import { host } from '../shared/config';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  vpassword: string = '';
  errors: any = {
    email: null,
    name: null,
    password: null,
  };
  user: any = {}
  @Output() onSubmit = new EventEmitter<boolean>();
  
  actions = new EventEmitter<string|MaterializeAction>();
  constructor(private WalletService: WalletService, private AuthService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  emailChange(event) {
    const data = { email: event };
    const rule = { email: 'required|email' }
    const validator = new Validator(data, rule);
    if (validator.fails()) {
      this.errors.email = validator.errors.first('email')
    }
  }

  save(user) {
    const { id, token, guid, email } = user;
    this.AuthService.authenticate(id, token, guid, email)
    const message = 'SignUp successful'
    this.onSubmit.emit(true);
    Alert('SignUp', 'success', { message }, 3000);
    this.actions.emit({action:"modal",params:['close']});
    this.router.navigate(['/account'])
  }

  createAccount(user) {
    this.user = user
    const url = `${host}/v1/wallet/accounts`;
      this.WalletService.post(url, user.name).subscribe(
        account => this.save(this.user),
        error => this.save(this.user)
      )
  }

  submit() {
    this.errors = {}
    const data = {
      email: this.email,
      name: this.name,
      password: this.password
    };
    const rule = {
      email: 'required|email',
      name: 'required',
      password: ['required', 'min:10', { in: [this.vpassword] }],
    }
    const validator = new Validator(data, rule);
    const isError = validator.fails()
    const allError = validator.errors.errors;

    Object.entries(allError).forEach((obj) => {
      this.errors[obj[0]] = validator.errors.first(obj[0]);
    });

    if (!isError) {
      const url = `${host}/v1/auth/signup`;
      this.WalletService.post(url, data).subscribe(
        user => this.createAccount(user),
        error => Alert('SignUp', 'error', error.error.errors, 3000)
      )
    }

  }
}
