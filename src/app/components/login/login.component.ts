import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthentificationService } from '../../service/authentification.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  Username:string="";
Password:string="";
errorMsg:string=""
isShowLogin:boolean=false;
isShowSignUp:boolean=false;
constructor(private auth:AuthentificationService, private router:Router) { }

ngOnInit(): void {
  this.isShowLogin=false;
  this.isShowSignUp=false;
}

openLogin(){
  this.isShowLogin=true;
 
}
openSignUp(){
  this.isShowSignUp=true;
  
 
}

login():void{
  if(this.Username.trim().length===0){
    this.errorMsg="* Username is required";
  }
  else if(this.Password.trim().length===0){
    this.errorMsg="* Password is required";

  }
  else {
   
    let response= this.auth.login(this.Username,this.Password);
    if(response==200)
    {
      this.errorMsg="";
      this.router.navigate(['/home']);
    }
    else if(response==403){
      this.errorMsg="* Invalid Credentials";
      
    }
  }
}

}
