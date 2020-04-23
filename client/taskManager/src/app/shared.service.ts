import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private loggedIn = new BehaviorSubject(localStorage.getItem('auth_token')!==null);
  logInFlag = this.loggedIn.asObservable();
  constructor() { }

  toggleHeader(flag){
    this.loggedIn.next(flag);
  }
}
