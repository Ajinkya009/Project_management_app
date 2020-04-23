import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;
  constructor(private router:Router,private sharedService: SharedService) {
   }

  ngOnInit(): void {
    this.sharedService.logInFlag.subscribe(loggedIn=>{
      this.loggedIn = loggedIn;
    });
  }

  logout(){
    localStorage.removeItem('auth_token');
    this.sharedService.toggleHeader(false);
    this.router.navigate(['login']);
  }

}
