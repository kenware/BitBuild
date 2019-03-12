import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login/login.component';
import { MaterializeModule } from 'angular2-materialize';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.css';
import * as Materialize from "angular2-materialize";
import { Router } from '@angular/router';
import { AuthService } from './service/auth/auth.service';

describe('AppComponent', () => {
  let service: AuthService
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientTestingModule,
        MaterializeModule,

      ],
      declarations: [
        AppComponent,
        SignupComponent,
        LoginComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'BitBuild'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('BitBuild');
  });
});
