import { Injectable } from '@angular/core';
import {Router} from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
  authenticate(id, token, guid): void{
    localStorage.setItem('accessToken', token)
    localStorage.setItem('id', id)
    localStorage.setItem('guid', guid)
  };
  logout(): void{
    localStorage.removeItem('accessToken')
    localStorage.removeItem('id')
    localStorage.removeItem('guid')
    this.router.navigate([''])
  }
}
