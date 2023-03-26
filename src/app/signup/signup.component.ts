import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

declare var $:any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
isStyleInvalid={'background-color':'#28a745','border-color':'#28a745'}

isStyleValid={'background-color':'#000','border-color':'#000'};
error:string='';
isclicked=false;
isSucess='';
isSucessed=false;
  constructor( private _AuthService:AuthService,private _Router:Router) { }
  signUp=new FormGroup(
{first_name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10) ,Validators.pattern(/^([a-zA-z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
  last_name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10),Validators.pattern(/^([a-zA-z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
  age:new FormControl(null,[Validators.required,Validators.min(12),Validators.max(80)]),
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)])
})
formData(){
this.isclicked=true;
if(this.signUp.valid){
  this._AuthService.signUp(this.signUp.value).subscribe((Response)=>{
    if(Response.message=="success"){
   
      this.isclicked=false;  
      this.isSucessed=true;
      this.isSucess=Response.message;
    this._Router.navigate(['/signin'])
    }else{
      this.error=Response.errors.email.message;
      this.signUp.reset();
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
