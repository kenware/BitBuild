import { HttpClient,  HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ 
  providedIn: 'root'
})

export class WalletService {

  constructor(private http: HttpClient, private Interceptor: AuthService) { }
  
  post(url, data): Observable<object> {
    return this.http.post <object>(url, data, this.Interceptor.httpOption()).pipe(
      tap(data => JSON.stringify(data)),
      catchError(err => throwError(err)) 
    )

  }
  get(url): Observable<any[] | object> {
    return this.http.get <any[] | object>(url, this.Interceptor.httpOption()).pipe(
      tap(data => JSON.stringify(data)),
      catchError(err => throwError(err))
    )
  }
}
