import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

declare var $:any;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  isStyleInvalid={'background-color':'#28a745','border-color':'#28a745'}

  isStyleValid={'background-color':'#000','border-color':'#000'};
  error:string='';
  isclicked=false;
isSucess='';
isSucessed=false;
  constructor( private _AuthService:AuthService ,private _Router:Router) { 
if(this._AuthService.isLoggedIn()){
  this._Router.navigate(["/profile"])
}


  }
  signIn=new FormGroup(
    {
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)])
    });
    formDataIn(){
      this.isclicked=true;
      if(this.signIn.valid){
        this._AuthService.signIn(this.signIn.value).subscribe((Response)=>{
          if(Response.message=="success"){
            this.isclicked=false;  
            this.isSucessed=true;
            this.isSucess=Response.message;
            localStorage.setItem("token",Response.token)
          this._Router.navigate(['/profile'])
          }else{
            this.error=Response.message;
            this.signIn.reset();
          }
      })
      }

  }
  ngOnInit(): void {
    $('#signUp').particleground({
   
      maxSpeedX:0.5,
      minSpeedY:0.5
    });
  }
}

