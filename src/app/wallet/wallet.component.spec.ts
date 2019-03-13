import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletComponent } from './wallet.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('WalletComponent', () => {
  let component: WalletComponent;
  let fixture: ComponentFixture<WalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletComponent ],
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
    fixture = TestBed.createComponent(WalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should copy address to clipboard', () => {
    component.accounts = [{
      label: 'New account',
      receiveAddress: 'sgdhej3688jss',
      balance: 23
    }]
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click()
    spyOn(component, 'copyBalance')
    button.click()
    expect(component.copyBalance).toHaveBeenCalled();
  });
});
