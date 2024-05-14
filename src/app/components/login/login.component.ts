import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthentificationService } from '../../service/authentification.service';
import { SuccessComponent } from '../success/success.component';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { NgIf,NgClass } from '@angular/common';
import { Util } from '../../../util';
import { NgOtpInputModule } from  'ng-otp-input';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
 
  imports: [
    FormsModule,
    NgIf,
    HttpClientModule,
    ReactiveFormsModule,
    SuccessComponent,
    ToastrModule,
    NgOtpInputModule,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  profileDataTemp:any=[];
  otherOrg: string = 'assets/GameImages/qrgamewebsiteassets/BG.png';
  R1BackGround:string='assets/GameImages/qrgamewebsiteassets/r1Background.png';
  Username:string="";
  Password:string="";
  otpIsHeare:any;
  isLoaderActive:boolean=true;
  City:string="";
  PhoneNumber:any;
  errorMsg:string="";
  Email:string="";
  EmailLogin:string='';
  PasswordLogin:string='';
  EmailForOTP:string='';
  loginFormMiniGame:FormGroup;
isShowLogin:boolean=false;
isShowSignUp:boolean=false;
showPassword: boolean = false;
showOtPScreen:boolean=false;
isverifyOtp:boolean=false;
isForgetPassword:boolean=false;
isUserAlreadyRegistered:boolean=false;
PhoneNumberPassword:any;
successMessage:any;
otpValue:any;
  formBuilder: any;
  profileData: any;
  getOtp:number=1234;
  EmailSignUp:any;
  dialog: any;
  private otpChangeSubject: Subject<any> = new Subject<any>();
  private checkEmailOrPhone:Subject<any>= new Subject<any>();
  eyeIcons = {
    open: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="eye-icon"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" /><path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" /></svg>',
    closed: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="eye-icon"><path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" /><path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" /><path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" /></svg>'
  };
  timer: any;
  isAllowResendOTP:boolean=false;
username: any;
emailForOTP: any;
password: any;
city: any;
  sourceGenerateOtp: string='phone';
  otpLength: number=0;
  passwordMessage: string='show';
  orgId:number=0
  orgnizationId: any;
  NgageLogo: any;
  logoData:any;
constructor(private auth:AuthentificationService, private router:Router,private Util: Util,private fb:FormBuilder,private Route:ActivatedRoute) {
  this.loginFormMiniGame = this.fb.group({
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', Validators.required]
    
  });
   

  console.log(this.loginFormMiniGame.get('Email'))
 }

ngOnInit(): void {
  this.Route.queryParams.subscribe((params:any)=>{
    this.orgnizationId = params['org_id'];

      localStorage.setItem('id_org',this.orgnizationId);
    console.log(this.orgnizationId);
    this.auth.getLogos(this.orgnizationId).subscribe((res)=>{
      console.log(res)
      this.logoData=res;
      this.NgageLogo=this.logoData?.ngage_logo;
    })
    setTimeout(()=>{
      this.isLoaderActive=false;
    },3000)


  })
 
  this.isShowLogin=false;
  this.isShowSignUp=false;
  this.otpChangeSubject.pipe(debounceTime(500)).subscribe((otp: any) => {
    
    this.otpValue = otp;
    console.log(this.otpValue);
  });
 



}

isShowPassword(){
  this.showPassword=!this.showPassword;
  if(!this.showPassword){
    this.passwordMessage="show"
  }
  else{
    this.passwordMessage="hide"

  }

}
openLogin(){
  this.isShowLogin=true;
  this.isShowSignUp=false;
  this.isverifyOtp=false;
  this.isUserAlreadyRegistered=false;
  this.showOtPScreen=false;
 
}
openSignUp(){
 
  this.isverifyOtp=false;
  this.isUserAlreadyRegistered=false;
  this.isShowLogin=false;
  this.isShowSignUp=true;
  this.showOtPScreen=false;
  
 
}
GenerateOtpBtn(source:any){
  console.log(source);
  this.showOtPScreen=true;
  this.isShowSignUp=false;
  console.log(this.PhoneNumber)
  // this.getOtp= Math.floor(10000 + Math.random()*99999)
  if(this.PhoneNumber.includes('@')){
    this.otpLength=6
    let Email=this.PhoneNumber;
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
    this.auth.getEmailOtp(Email).subscribe((res)=>{
    console.log(res);
    this.timer=30;
   
   
  })
  }
  else{
    this.otpLength=4
    let body=
      {
        "template_id": "6606a904d6fc056a333b9762",
        "mobile":'91'+this.PhoneNumber,
        "authkey": "318438A60qs5Ysgqr5e47c80dP1"
      }
    
    this.auth.getOtp(body).subscribe((res)=>{

      console.log(res);
      this.timer=30;
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
 
  
  
  


  

}
resendOtp(){
  if(this.PhoneNumber.includes('@')){
    this.otpLength=6
    let Email=this.PhoneNumber;
    this.auth.getEmailOtp(Email).subscribe((res)=>{
    console.log(res);
    this.timer=30;
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
  else{
    this.otpLength=4
    let body=
      {
        "template_id": "6606a904d6fc056a333b9762",
        "mobile":'91'+this.PhoneNumber,
        "authkey": "318438A60qs5Ysgqr5e47c80dP1"
      }
    
    this.auth.getOtp(body).subscribe((res)=>{

      console.log(res);
      this.timer=30;
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
 

}
onOtpChange(otp: any) {
  // Push the OTP value to the subject
  this.otpChangeSubject.next(otp);
}

// verifyBtn(){
  

//  if(this.PhoneNumber.includes('@')){
//   this.otpLength=6
//   let body={
//     "otp":this.otpValue,
//     "email":this.PhoneNumber,
//     'orgId':0

//   }
//   this.otpLength=6
//   this.auth.verifyEmailOtp(body).subscribe((res)=>{
//     console.log(res)
//     this.isShowSignUp=false;
//     this.isverifyOtp=true;
//     this.signUpTemp()
//   })

//  }
//  else{
//   let body={
//     "otp":this.otpValue,
//     "PhoneNumber":this.PhoneNumber

//   }
//   this.otpLength=4
//   this.auth.verifyOtp(body).subscribe((res)=>{
//     console.log(res);
//     this.successMessage=res;
//    console.log(this.successMessage.message)

//   // this.showOtPScreen=false;
//    this.isShowSignUp=false;
//  if(this.successMessage.message=='OTP verified success'){
 
//   this.isverifyOtp=true;
//   this.signUpTemp()

//  }
//  else{
//   this.errorMsg="Please Enter valid OTP"
//  }
//   })
//  }
//   }
//   signUpTemp() {
//     let body = {
//       "org_id": this.orgnizationId,
//       "name": this.Username,
//       "email": this.Email,
//       "password": this.Password,
//       "phone_number": this.PhoneNumber,
//       "city": this.City
//     };
  
//     this.auth.signUpApi(body).subscribe(
//       (res) => {
//         // Handle success response
//         this.signup()
//         setTimeout(() => {
//           window.location.reload();
//         }, 2000);
//       },
//       (error) => {
//         // Handle error
//         console.error("Sign up error:", error);
//         alert("Email or phone number Already Registered");
//         // You can show an error message to the user or handle the error in any appropriate way.
//       }
//     );
//   }
verifyBtn() {
  if (this.PhoneNumber.includes('@')) {
    this.otpLength = 6;
    let body = {
      "otp": this.otpValue,
      "email": this.PhoneNumber,
      'orgId': 0
    };
    this.auth.verifyEmailOtp(body).subscribe(
      (res) => {
        console.log(res);
        this.isShowSignUp = false;
        this.isverifyOtp = true;
        this.signUpTemp();
      },
      (error) => {
        console.error("Verification error:", error);
        // Handle verification error, show error message or perform any appropriate action
      }
    );
  } else {
    let body = {
      "otp": this.otpValue,
      "PhoneNumber": this.PhoneNumber
    };
    this.otpLength = 4;
    this.auth.verifyOtp(body).subscribe(
      (res) => {
        console.log(res);
        this.successMessage = res;
        console.log(this.successMessage.message);
        if (this.successMessage.message == 'OTP verified success') {
          this.isverifyOtp = true;
          this.signUpTemp();
        } else {
          this.errorMsg = "Please Enter valid OTP";
        }
      },
      (error) => {
        console.error("Verification error:", error);
        // Handle verification error, show error message or perform any appropriate action
      }
    );
  }
}

signUpTemp() {
  let body = {
    "org_id": this.orgnizationId,
    "name": this.Username,
    "email": this.Email,
    "password": this.Password,
    "phone_number": this.PhoneNumber,
    "city": this.City
  };

  this.auth.signUpApi(body).subscribe(
    (res) => {
      // Handle success response
      this.signup();
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2000);
    },
    (error) => {
      console.error("Sign up error:", error);
      if (error.status === 400) {
        // alert("Email or phone number Already Registered");
        this.isverifyOtp=false;
        this.isUserAlreadyRegistered=true;
        this.isShowLogin=false;
        this.isShowSignUp=false;
        this.showOtPScreen=false;
        
        // Handle duplicate registration error
      } else {
        // Handle other errors
      }
    }
  );
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
        "ID_ORGANIZATION":this.orgnizationId,
        // "Organization_Name":"The Gamification Company",
        "login_type": 4
  };

  const userId = this.Util.encryptData(body);
  console.log(userId);

  console.log(body);
  
  try {
      const res = await this.auth.registrationApi({"Data": JSON.stringify(body)}).toPromise();
      
      this.isverifyOtp=true;
      this.isUserAlreadyRegistered=false; 
      this.isShowLogin=false;
       this.isShowSignUp=false;
       this.showOtPScreen=false;
  
    
      alert("User Created SuccessFully");
     
      
   
      
    console.log(res);
      // Handle response if necessary
  } catch (error) {
      console.error(error);
    
      // setTimeout(()=>{
      //   window.location.reload()
      // },2000)
     
      this.errorMsg="Email or phone number is already Registered";
      // Handle error conditions if necessary
  }


 
}

isPhoneTab:boolean=true;
openPhoneTab(){
  this.isPhoneTab=!this.isPhoneTab;
  if(this.isPhoneTab){
    this.sourceGenerateOtp='phone'
  }
  else{
    this.sourceGenerateOtp='email'
  }
}


loginTemp() {
  let body = {
    "email": this.EmailLogin,
    "password": this.PasswordLogin,
    "org_id":this.orgnizationId
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
      {"email":this.EmailLogin,"password":"Ngage@2019",'id_organization':Number(this.orgnizationId)}
  ;
  
  let login = this.Util.encryptData(body);

  try {
      const res = await this.auth.login(body).toPromise();
      console.log(res?.hasOwnProperty);
      
       this.profileDataTemp=res;
      
      
      this.profileData =this.profileDataTemp?.user
      console.log(this.profileData);
      
      localStorage.setItem("ProfileData",JSON.stringify(this.profileData))

      
      if (res !== '"Invalid credentials"') {
          
         
         this.router.navigate(['/home']);
            
          
          
           
          
          
         
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

forgetPassword(){
  this.isForgetPassword=true;
  this.isShowLogin=false;

  this.isShowSignUp=false;
  this.otpLength=4;
}
showOtpBoxes:boolean=false;
showSubmit:boolean=false;
getOTPForForgetPassword(){
  this.showOtpBoxes=true;
  if(this.PhoneNumberPassword.includes('@')){
    this.otpLength=6
    let Email=this.PhoneNumberPassword;
    this.auth.getEmailOtp(Email).subscribe((res)=>{
    console.log(res);
    this.timer=30;
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
  else{
    this.otpLength=4
    let body=
      {
        "template_id": "6606a904d6fc056a333b9762",
        "mobile":'91'+this.PhoneNumberPassword,
        "authkey": "318438A60qs5Ysgqr5e47c80dP1"
      }
    
    this.auth.getOtp(body).subscribe((res)=>{

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

}

verifyStatus:any;
enabledPassword:boolean=false;

verifyForgetpasswordOtp(){
  if(this.PhoneNumberPassword.includes('@')){
    let body={
      "otp":this.otpValue,
      "email":this.PhoneNumberPassword,
      'orgId':0
  
    }
    this.otpLength=6
    this.auth.verifyEmailOtp(body).subscribe((res)=>{
      console.log(res)
      
      this.verifyStatus=res
     
      this.isverifyOtp=true;
    
      console.log(this.verifyStatus);
      
    if(this.verifyStatus=='OTP is correct.'){
      this.enabledPassword=true;
    
    }
    this.showOtPScreen=false;
    this.isShowSignUp=false;

    })
    
   }
   else{
    let body={
      "otp":this.otpValue,
      "PhoneNumber":this.PhoneNumberPassword
    }
    this.otpLength=4
    this.auth.verifyOtp(body).subscribe((res)=>{
      console.log(res);
      this.successMessage=res;
     console.log(this.successMessage.message=='OTP verified success')
     if(this.successMessage?.message=='OTP verified success'){
      this.enabledPassword=true;
     
    }
  
    this.showOtPScreen=false;
     this.isShowSignUp=false;
   
    })
   }
   
  
}
forgetPasswordValue:any;
updateSuccessMessgae:any
isverifyOtpForgetPassword:boolean=false;
updatePassword(){
  let body=
    {
      "org_id": this.orgnizationId,
      "phone_number":this.PhoneNumberPassword ,
      "password": this.forgetPasswordValue}
  
  this.auth.updatePassword(body).subscribe((res)=>{

this.updateSuccessMessgae=res
console.log();

if(this.updateSuccessMessgae?.message=='Password updated successfully'){
  this.isverifyOtpForgetPassword=true;
  this.isForgetPassword=false;
 
}
else{
  alert(this.updateSuccessMessgae?.message)
  
}

  })
}
verifyDone(){
  this.isverifyOtpForgetPassword=false;
  this.isForgetPassword=false;
  this.openLogin();
}
checkExistingPhoneNumber(input: any) {
  console.log('Value');

  if (typeof input === 'string' && input.length > 9) {
    const body = { phoneNumber: input };
    this.auth.checkExistingPhoneNumber(body).subscribe((res) => {
      console.log(res);
    });
  } else if (typeof input === 'string' && input.includes('@')) {
    const body = { email: input };
    this.auth.checkExistingPhoneNumber(body).subscribe((res) => {
      console.log(res);
    });
  } else {
    console.error('Invalid input');
  }
}


}
