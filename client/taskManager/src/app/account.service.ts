import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private loggedInStatus = false;

  constructor(private http:HttpClient, private router:Router) { }

  setLoggedIn(value:boolean){
    this.loggedInStatus = value;
  }

  get isLoggedIn(){
    return localStorage.getItem('auth_token')!==null;
  }

  loginUser(username,password){
    return this.http.post('/api/auth/login/',{
      username:username,
      password: password
    });
  }

  registerUser(username,password,email){
    return this.http.post('/api/auth/signup/',{
      username:username,
      password:password,
      email:email
    });
  }
}
