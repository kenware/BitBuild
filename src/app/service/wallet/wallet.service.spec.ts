import { TestBed } from '@angular/core/testing';

import { WalletService } from './wallet.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WalletService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: WalletService = TestBed.get(WalletService);
    expect(service).toBeTruthy();
  });

  it('should be create a wallet', () => {
    const service: WalletService = TestBed.get(WalletService);
    service.post('/ap/vi/create', {name: 'kevin'}).subscribe( data => {
      expect(data).toBe({name: 'kevin'});
    })
  });

  it('should get a wallet', () => {
    const service: WalletService = TestBed.get(WalletService);
    service.get('/ap/vi/create').subscribe( data => {
      expect(data).toBe({name: 'kevin'});
    })
  });

});
