import { Component, OnInit } from '@angular/core';
import Validator from 'validatorjs';
import { Alert } from '../shared/alert';
import { WalletService } from '../service/wallet/wallet.service';
import { host } from '../shared/config';

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
  user: any = {};
  constructor(private WalletService: WalletService) { }

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

  async submit() {
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
        user => {
          const message = 'SignUp successful'
          console.log(user)
          this.user = user
          Alert('SignUp', 'success', { message }, 3000);
        },
        error => {
          console.log(error)
          Alert('SignUp', 'error', error.error.errors, 3000);
        }
      )
    }

  }
}
