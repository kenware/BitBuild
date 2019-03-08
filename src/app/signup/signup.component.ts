import { Component, OnInit } from '@angular/core';
import Validator from 'validatorjs';
import { Alert } from '../shared/alert';
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
  constructor() { }

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
    const allError = validator.errors.errors;
    console.log(allError)
    Object.entries(allError).forEach((obj) => {
      this.errors[obj[0]] = validator.errors.first(obj[0]);
    });
    Alert('SignUp', 'error', allError, 3000);
  }
}
