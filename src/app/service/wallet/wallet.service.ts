import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({ 
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) { }
  
  post(url, data): Observable<object> {
    return this.http.post <object>(`${url}`, data).pipe(
      tap(data => JSON.stringify(data)),
      catchError(err => throwError(err)) 
    )

  }
  get(url): Observable<any[] | object> {
    return this.http.get <any[] | object>(url).pipe(
      tap(data => JSON.stringify(data)),
      catchError(err => throwError(err))
    )
  }
}
