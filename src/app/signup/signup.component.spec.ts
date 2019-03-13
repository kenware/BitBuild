import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SignupComponent } from './signup.component';
import { MaterializeModule } from 'angular2-materialize';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let router: Router;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
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
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should respond to email input change ', () => {
    let button = fixture.debugElement.nativeElement.querySelector('button');
    component.email = 'ejykken@gmail';
    button.click()
    expect(component.errors.name).toEqual('The name field is required.');
    expect(component.errors.password).toEqual('The password field is required.');
  });
  it('should submit form without error', () => {
    let button = fixture.debugElement.nativeElement.querySelector('button');
    component.email = 'ejykken@gmail.om';
    component.name = 'ejykken';
    component.password = 'ejykkengmail123';
    component.vpassword = 'ejykkengmail123';
    button.click()
    fixture.detectChanges();
    expect(component.errors.name).toEqual(undefined);
    expect(component.errors.password).toEqual(undefined);
  });
  it('should respond to email input change ', () => {
    component.emailChange('ejykken@gmail');
    expect(component.errors.email).toEqual('The email format is invalid.');
  });
  it('should call component methods method ', () => {
    const user = { id:1, token: 'sgshhs', guid: '242fsfsg'}
    component.createAccount(user)
    component.save(user);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/account']);
    const save = spyOn(component, 'save')
    const createAccount = spyOn(component, 'createAccount')
    component.save(user);
    component.createAccount(user)
    expect(save).toHaveBeenCalled()
    expect(createAccount).toHaveBeenCalled()
  });
});
