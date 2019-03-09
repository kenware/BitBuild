import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [
        FormsModule,
        HttpClientTestingModule
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
});
