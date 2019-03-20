import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AccountComponent } from './account.component';
import { ChartComponent } from '../chart/chart.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ExchangeRateService } from '../service/exchange/exchange-rate.service';
import { of, throwError } from 'rxjs';
import { WalletService } from '../service/wallet/wallet.service';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let exchangeStub;
  let walletStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountComponent, ChartComponent ],
      imports: [
        FormsModule,
        ChartsModule,
        HttpClientTestingModule,
        RouterTestingModule
       ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    exchangeStub = fixture.debugElement.injector.get(ExchangeRateService);
    walletStub = fixture.debugElement.injector.get(WalletService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test formatData function', () => {
    const data = {
      values: [
        { x: '1534567844333', y: 2345566},
        { x: '15345678443333', y: 2345566}
      ]
    }
    component.formatData(data)
    expect(component.lineChartData[0].data).toEqual([2345566,2345566])
    expect(component).toBeTruthy();
  });
  it('should call angular methods', () => {
    const spy1 = spyOn(exchangeStub, 'getExchangeRate').and.returnValue(
      of(6)
    );
    const spy2 = spyOn(walletStub, 'post').and.returnValue(
      of('custom')
    );
    component.planData = { test: 456 }
    component.plan = 'test';
    component.invest()
    expect(component).toBeTruthy();

    component.plan = 'custom'
    component.balance=20;
    component.invest()
    expect(component).toBeTruthy();
    expect(spy1.calls.any()).toEqual(true);
    expect(spy2.calls.any()).toEqual(true);
  });

  it('should test lifecycle hooks', () => {
    const spy1 = spyOn(exchangeStub, 'getExchangeRate').and.returnValue(
      of({values:[{ x: '2353555', y:1234 }], "USD": 234, "last": 23456})
    );
    const spy3 = spyOn(walletStub, 'get').and.returnValue(
      of({ balance : 3})
    );
    component.ngOnInit()
    expect(spy1.calls.any()).toEqual(true);
    expect(spy3.calls.any()).toEqual(true);

  });

  it('test select plan method', () => {
    component.selectPlan('custom');
    expect(component.isCustom).toBeTruthy();
    expect(component).toBeTruthy();
    component.selectPlan('test');
    expect(component.isCustom).toBe(false)
  });
  it('component methods should be called', () => {
    const user = {id:1, email: 'email', guid: 'guid', token: 'token'}
    component.refreshAuth(user)
    spyOn(component, 'refreshAuth')

    component.refreshAuth(user)
    expect(component.refreshAuth).toHaveBeenCalled()
    expect(component).toBeTruthy();
  });
  it('should scroll to historical section of the page on button click', () => {
    let button = fixture.debugElement.nativeElement.querySelector('.scroll');
    button.click()
    const scroll = spyOn(component, 'moveToStructure')
    button.click()
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(scroll).toHaveBeenCalled()
  });
});
