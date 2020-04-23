import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { error } from '@angular/compiler/src/util';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  loginForm : boolean = true;
  constructor(private account:AccountService, private router:Router,private toastr: ToastrService, private sharedService:SharedService) { }

  ngOnInit(): void {
    if(localStorage.getItem('auth_token')!=null){
      this.router.navigate(['dashboard']);
    }
  }

  /** Login and redirect user to dashboard page */
  loginUser(event){
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector("#username").value;
    const password = target.querySelector("#password").value
    this.account.loginUser(username,password).subscribe(data=>{
      if(data.hasOwnProperty('auth_token')){
        localStorage.setItem('auth_token',data['auth_token']);
        this.sharedService.toggleHeader(true);
        this.router.navigate(['dashboard']);
      }
    },(err:HttpErrorResponse)=>{
      Object.keys(err.error).map(key=>{
        this.toastr.error(err.error[key],key);
      });
      
    });
  }

  registerUser(event){
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector("#username").value;
    const password = target.querySelector("#password").value;
    const email = target.querySelector("#email").value;
    this.account.registerUser(username,password,email).subscribe(data=>{
      if(data.hasOwnProperty('auth_token')){
        localStorage.setItem('auth_token',data['auth_token']);
        this.sharedService.toggleHeader(true);
        this.router.navigate(['dashboard']);
      }
    },(err:HttpErrorResponse)=>{
      Object.keys(err.error).map(key=>{
        this.toastr.error(err.error[key],key);
      });
    });
  }

  /** Toggle login/signup form */
  toggleForm(login:boolean){
    this.loginForm = login;
  }

}
