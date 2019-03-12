import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AccountComponent } from './account.component';
import { ChartComponent } from '../chart/chart.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

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
    component.planData = { test: 456 }
    component.plan = 'test';
    component.invest()
    expect(component).toBeTruthy();
    component.plan = 'custom'
    component.invest()
    expect(component).toBeTruthy();
  });
  it('test select plan method', () => {
    component.selectPlan('custom');
    expect(component.isCustom).toBeTruthy();
    expect(component).toBeTruthy();
    component.selectPlan('test');
    expect(component.isCustom).toBe(false)
  });
});
