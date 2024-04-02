import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthentificationService } from '../../service/authentification.service';
import { SuccessComponent } from '../success/success.component';
import { ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Util } from '../../../util';
import { NgOtpInputModule } from  'ng-otp-input';

import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf,HttpClientModule,ReactiveFormsModule,SuccessComponent,ToastrModule,NgOtpInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  Username:string="";
  Password:string="";
  otpIsHeare:any;
  City:string="";
  PhoneNumber:any;
  errorMsg:string="";
  Email:string="";
  EmailLogin:string='';
  PasswordLogin:string=''
  loginFormMiniGame:FormGroup;
isShowLogin:boolean=false;
isShowSignUp:boolean=false;
showPassword: boolean = false;
showOtPScreen:boolean=false;
isverifyOtp:boolean=false;
successMessage:any;
otpValue:any;
  formBuilder: any;
  profileData: any;
  getOtp:number=1234;
  dialog: any;
  private otpChangeSubject: Subject<any> = new Subject<any>();
  eyeIcons = {
    open: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="eye-icon"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" /><path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" /></svg>',
    closed: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="eye-icon"><path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" /><path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" /><path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" /></svg>'
  };
  timer: any;
  isAllowResendOTP:boolean=false;
constructor(private auth:AuthentificationService, private router:Router,private Util: Util,private fb:FormBuilder) {
  this.loginFormMiniGame = this.fb.group({
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', Validators.required]

  });

  console.log(this.loginFormMiniGame.get('Email'))
 }

ngOnInit(): void {
 
  this.isShowLogin=false;
  this.isShowSignUp=false;
  this.otpChangeSubject.pipe(debounceTime(1500)).subscribe((otp: any) => {
    
    this.otpValue = otp;
    console.log(this.otpValue);
  });
 



}


openLogin(){
  this.isShowLogin=true;
 
}
openSignUp(){
  this.isShowSignUp=true;
  
 
}
GenerateOtpBtn(){
  this.showOtPScreen=true;
  this.isShowSignUp=false;
  // this.getOtp= Math.floor(10000 + Math.random()*99999)


  let phone_number=this.PhoneNumber;
  this.auth.getOtp(phone_number).subscribe((res)=>{

    console.log(res);
    this.timer=15;
    setInterval(()=>{
      if(this.timer!=0){
        this.timer--;
      }
     
    },1000)
    if(this.timer==0){
      this.isAllowResendOTP=true;
      // this.resendOtp()
      this.timer=0;

    }
   
  })
  
  


  

}
resendOtp(){
  if(this.timer==0){
    this.auth.getOtp(this.PhoneNumber).subscribe((res)=>{
      console.log("Resend OTP successfully")
    })
  }
  else{
    this.timer=15;
  }

  console.log('resend otp')
 

}
onOtpChange(otp: any) {
  // Push the OTP value to the subject
  this.otpChangeSubject.next(otp);
}

verifyBtn(){

 
  let body={
    "otp":this.otpValue,
    "PhoneNumber":this.PhoneNumber

  }
  this.auth.verifyOtp(body).subscribe((res)=>{
    console.log(res);
    this.successMessage=res;
   console.log(this.successMessage.message)

  // this.showOtPScreen=false;
   this.isShowSignUp=false;
 if(this.successMessage.message=='OTP verified success'){
 
  this.isverifyOtp=true;
  this.signup()

 }
 else{
  this.errorMsg="Please Enter valid OTP"
 }
  })
 
  
  

    
  }
signUpTemp(){
  let body={
    "org_id": 18,
    "name": this.Username,
    "email": this.Email,
    "password": this.Password,
    "phone_number": this.PhoneNumber,
    "city": this.City
  }
  this.auth.signUpApi(body).subscribe((res)=>{
    console.log(res)
  })
}
submitForm() {
  // Reset form fields after submission
  this.Username = '';
  this.Email = '';
  this.PhoneNumber = '';
  this.Password = '';
  this.City = '';
  this.errorMsg = '';
}

  async signup(): Promise<void> {
    // let encryptedPassword = this.Util.encryptData(this.Password);
    let body = {
        "Name": this.Username,
        "Email": this.Email,
        // "Phone_No": this.PhoneNumber,
        // "Password": encryptedPassword,
        "ID_ORGANIZATION":18,
        // "Organization_Name":"The Gamification Company",
        "login_type": 4
  };

  const userId = this.Util.encryptData(body);
  console.log(userId);

  console.log(body);
  
  try {
      const res = await this.auth.registrationApi({"Data": JSON.stringify(body)}).toPromise();
      alert("User Created SuccessFully");
       
      console.log(res)
      if(res){
        this.signUpTemp();    
      }
      location.reload()
   
      
      console.log(res);
      // Handle response if necessary
  } catch (error) {
      console.error(error);
      alert("Email is already Registered");
      // window.location.reload()
      this.errorMsg="Email is already Registered";
      // Handle error conditions if necessary
  }


 
}


assignToUser(){
  // {list: {"AssessmentList":[{"Id_Assessment":"72"}],"UserList":[{"Id_User":"19664","Email":"developer@gmail.com"}]}}
  let body={list: {"AssessmentList":[{"Id_Assessment":"72"}],"UserList":[{"Id_User":"19665","Email":"Yuvi@gmail.com"}]}}
  this.auth.assignAssessmentToUser(body).subscribe((res)=>{
    console.log(res);
  })
}

loginTemp() {
  let body = {
    "email": this.EmailLogin,
    "password": this.PasswordLogin,
  };

  this.auth.loginApi(body).subscribe(
    (res) => {
      console.log(res);
      this.login();
     
    },
    (error) => {
      console.error("An error occurred:", error);
      this.errorMsg = "Invalid Credentials";
      alert("Invalid Credentials");
      // Handle error here, such as displaying an error message to the user
    }
  );
}
staticPassword:any;
async login() {
this.staticPassword='Ngage@2019';
 let encryptedPassword=this.Util.encryptData(this.staticPassword);
 console.log(encryptedPassword);
  let body = 
      // "Name": "",
      // "Email":this.EmailLogin,
      // "Password":encryptedPassword,
      // "login_type": 1
      {"Name":"","Email":this.EmailLogin,"Password":"Ngage@2019","login_type":4}
  ;
  
  let login = this.Util.encryptData(body);

  try {
      const res = await this.auth.login({ "Data": login }).toPromise();
      console.log(res?.hasOwnProperty);
      this.profileData = this.Util.decryptData(res);
      

      
      if (res !== '"Invalid credentials"') {
          
         
         this.router.navigate(['/home']);
            
          
            localStorage.setItem("ProfileData",this.profileData)
           
          
          
         
      } 
  } catch (error) {
      console.error(error);
      this.errorMsg = "Invalid Credentials";
      alert("Invalid Credentials");

      // Handle error conditions if necessary
  }
}

sendProfileDataToService(profileData: any) {
  // Call your service method here to send profileData
  this.auth.sendProfileData(profileData).subscribe((res:any)=>{
    console.log(res);
  })
}
isEyeOpen: boolean = false;
togglePassword(): void {
  const passwordField = document.querySelector<HTMLInputElement>("#password-field");
  const toggleButton = document.querySelector<HTMLButtonElement>(".toggle-button");

  if (!passwordField || !toggleButton) {
    return;
  }

  this.isEyeOpen = !this.isEyeOpen;

  toggleButton.classList.toggle("open");

  toggleButton.innerHTML = this.isEyeOpen ? this.eyeIcons.closed : this.eyeIcons.open;
  passwordField.type = this.isEyeOpen ? "text" : "password";
}
}
