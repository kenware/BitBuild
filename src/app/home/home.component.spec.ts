import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { of } from 'rxjs'
import { ExchangeRateService } from '../service/exchange/exchange-rate.service';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChartComponent } from '../chart/chart.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ HomeComponent, ChartComponent ],
      imports: [
        FormsModule,
        ChartsModule,
        HttpClientTestingModule
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render title in a h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain(' Welcome! to BitBuild');
  });
  it('should call component methods', () => {
    component.formatRate({USD: { last: 4555}, EUR: { last: 33}, GBP: { last: 33}})
    component.calculateRate();
    component.viewAllStat();
    spyOn(component, 'calculateRate');
    spyOn(component, 'viewAllStat');
    component.calculateRate();
    component.viewAllStat();
    expect(component.calculateRate).toHaveBeenCalled();
    expect(component.viewAllStat).toHaveBeenCalled();
  });
});
