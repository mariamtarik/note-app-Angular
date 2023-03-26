import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

declare var $:any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public _AuthService:AuthService ,private _Router:Router) {
   
   }
logout(){
  localStorage.clear();
  this._Router.navigate(["/signin"])
}

  ngOnInit(): void {

  }

}
