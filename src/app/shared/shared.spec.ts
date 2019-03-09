import { TestBed } from '@angular/core/testing';
import { Alert } from './alert'

describe('WalletService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should call alert.js', () => {
    const data = {message: 'success alert', error: ['no error']}
    const alert = Alert('success', 'success', data, 3000)
    expect(alert).toBeTruthy();
  });
  it('should call error alert', () => {
    const data = {message: 'error alert', error: ['error']}
    const alert = Alert('error', 'error', data, 3000)
    expect(alert).toBeTruthy();
  });

});
