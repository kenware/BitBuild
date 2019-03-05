import { TestBed, inject } from '@angular/core/testing';

import { ExchangeRateService } from './exchange-rate.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ExchangeRateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ExchangeRateService],
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: ExchangeRateService = TestBed.get(ExchangeRateService);
    expect(service).toBeTruthy();
  });

  it('should get exchange rate',inject([HttpTestingController, ExchangeRateService],
    (httpMock: HttpTestingController, service: ExchangeRateService) => {
    service.getExchangeRate('ticks').subscribe(data => {
      expect(data).toBe(21);
    });
  })
);
});
