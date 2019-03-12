import { Injectable } from '@angular/core';
import {Router} from "@angular/router"
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
  authenticate(id, token, guid, email): void{
    localStorage.setItem('accessToken', token)
    localStorage.setItem('id', id)
    localStorage.setItem('guid', guid)
    localStorage.setItem('email', email)
  };
  logout(): void{
    localStorage.removeItem('accessToken')
    localStorage.removeItem('id')
    localStorage.removeItem('guid')
    localStorage.removeItem('email')
    this.router.navigate(['/'])
  }
  verifyAuth(): object{
    const token = localStorage.getItem('accessToken');
    const id = localStorage.getItem('id')
    const guid = localStorage.getItem('guid')
    const email = localStorage.getItem('email')
    if (!token) {
      this.router.navigate([''])
    }
    return { token, id, guid, email };  
  }
  httpOption(): any{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      })
    }
    return  httpOptions;
  }
}
