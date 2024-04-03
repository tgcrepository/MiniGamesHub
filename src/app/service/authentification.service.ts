// import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
  

})
export class AuthentificationService {
  baseURL=`https://www.playtolearn.in`;

  baseURLNew=`https://www.playtolearn.in:8080/`;

  Path=`MollyTdirect_api/api/`;
  private _profileData: any;

  

 
  constructor(private router:Router,public http:HttpClient) { }

  login(body:any ){


    var tempurl= `${this.baseURL}`+`/${this.Path}login`;
    console.log(tempurl);
    return this.http.post(tempurl,body);
   

  }

  assignAssessmentToUser(data:any){
    var tempurl= `${this.baseURLNew}`+`api/autoAssignAssessment`;
    return this.http.post(tempurl,data)
  }



  
  
  registrationApi(body:any){
    console.log(body);
      var tempurl= `${this.baseURL}`+`/${this.Path}SelfRegistration`;
      console.log(tempurl);
      return this.http.post(tempurl,body);
    

  }


  logout(){
    this.router.navigate(['login'])
    
  }
  sendProfileData(data:any){
    return data;


  }
  get profileData(): any {
   
    return this._profileData;
  }

  set profileData(data: any) {
   
    this._profileData = data;
  }
  signUpApi(body:any){
    var tempurl= `${this.baseURLNew}`+`api/signup`;
    console.log(tempurl);
    return this.http.post(tempurl,body);
  }

  loginApi(body:any){
    var tempurl= `${this.baseURLNew}`+`api/Login`;
    console.log(tempurl);
    return this.http.post(tempurl,body);
    


  }
  getGameDataList(orgId:any){
    var tempUrl=`${this.baseURLNew}api/getGameList/${orgId}`;
    return this.http.get(tempUrl);
  }

  getOtp(body:any){
    var tempurl=`https://control.msg91.com/api/v5/otp?template_id=6606a904d6fc056a333b9762&mobile=91${body}&authkey=318438A60qs5Ysgqr5e47c80dP1`
    return this.http.post(tempurl,body)
  }
  verifyOtp(body:any){
    // const authKey = `318438A60qs5Ysgqr5e47c80dP1`;

    const url = `https://control.msg91.com/api/v5/otp/verify?otp=${body.otp}&mobile=91${body.PhoneNumber}`;

    // Set the headers
    const headers = new HttpHeaders().set('authkey', '318438A60qs5Ysgqr5e47c80dP1');

    // Make the GET request with headers
    return this.http.get(url, { headers: headers, withCredentials: true })

  }

  getEmailOtp(email:any){
    var tempUrl=`https://www.playtolearn.in/Mini_games_beta/api/GenerateEmailOTP?Email=${email}`;
    return this.http.get(tempUrl)
  }
  verifyEmailOtp(data:any){
    var tempUrl=`https://www.playtolearn.in/Mini_games_beta/api/confirmOTP?Email=${data?.email}&otp=${data?.otp}&OrgID=0`;
    return this.http.get(tempUrl)

  }

  getAssesmentId(data:any){
    var tempurl= `${this.baseURLNew}`+`api/getAssessment?ID_ORGANIZATION=${data?.org_id}&Id_Game=${data?.id_game}`;
  
    return this.http.get(tempurl,data);

  }
  getLeaderBoard(data:any){
    var tempurl= `${this.baseURLNew}`+`api/leaderboard?id_game=${data?.id_game}&ID_ORGANIZATION=${data.orgId}`;
  
    return this.http.get(tempurl,data);

  }
  getLeaderBoardInfo(data:any){
    var tempurl= `${this.baseURLNew}`+`api/userInfo?id_user=${data?.id_user}&id_game=${data?.id_game}&id_organization=${data?.orgId}`;
  
    return this.http.get(tempurl,data);


  }
}

