import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterializeModule } from "angular2-materialize";

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { WalletService } from '../service/wallet/wallet.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let WalletService: WalletService

  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        MaterializeModule,
        RouterTestingModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should submit form without error', () => {
    const user = { id:1, token: 'sgshhs', guid: '242fsfsg'}
    let button = fixture.debugElement.nativeElement.querySelector('button');

    component.email = 'ejykken@gmail.om';
    component.password = 'ejykkengmail123';
    button.click()
    fixture.detectChanges();
    expect(component.email).toEqual('ejykken@gmail.om');
  });

  it('should call save method ', () => {
    const user = { id:1, token: 'sgshhs', guid: '242fsfsg'}
    component.save(user);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/account']);
    
    const save = spyOn(component, 'save')
    component.save(user);
    expect(save).toHaveBeenCalled()
  });
});
