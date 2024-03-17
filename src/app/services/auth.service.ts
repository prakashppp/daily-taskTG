import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  getToken(){
    return localStorage.getItem('token')
  }

  logout(){
     localStorage.removeItem('token')
     localStorage.removeItem('data')
    
     this.router.navigate(['/login']);
     //window.alert('session expired, Login again')
  }
}
