
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {  blockchain } from '../../shared/config';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private base_url = blockchain;
  constructor(private http: HttpClient) { 
  }
  getExchangeRate(url): Observable<object | number>{
    return this.http.get <object | number>(`${this.base_url}/${url}`).pipe(
      tap(data => JSON.stringify(data)),
      catchError(err => err)
    )
  }
}
