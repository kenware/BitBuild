import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentComponent } from './investment.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('InvestmentComponent', () => {
  let component: InvestmentComponent;
  let fixture: ComponentFixture<InvestmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentComponent ],
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
    fixture = TestBed.createComponent(InvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should should withraw investment', () => {
    component.plans = [
      {
        id: 1, amount: 23, name: 'test', principal: 34, createAt: '2019-02-05'
      }
    ]
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('.withdraw');
    button.click()
    const withdraw = spyOn(component, 'withdraw')
    button.click()
    fixture.detectChanges();
    expect(withdraw).toHaveBeenCalled()
    expect(component).toBeTruthy();
  });
});
