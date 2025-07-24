// import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  baseURL=`https://www.m2ost.in`;

  //production URL
  // baseURLNew=`https://www.playtolearn.in:8080/`;
  baseURLNew=`https://n-gage.co.in:4000/`
  //Beta URL
  // baseURLNew=`https://n-gage.co.in:8080/`
  // ImageBaseUrlBeta
  imageURL=`https://www.n-gage.co.in/N-gage_new_cms_beta/uploads/`


    //Production URL
    Path=`/nGage-MollyTdirect_api/api`
    //Beta URL
    // Path=`/nGage-MollyTdirect_api_beta/api`

  private _profileData: any;
  isSpecficGamesOpen:boolean=true;
  constructor(private router:Router,public http:HttpClient) { }
  login(body:any ){
    var tempurl= `${this.baseURLNew}`+`api/ngageLogin`;
    console.log(tempurl);
    return this.http.post(tempurl,body);
  }
  assignAssessmentToUser(data:any){
    var tempurl= `${this.baseURLNew}`+`api/autoAssignAssessment`;
    return this.http.post(tempurl,data)
  }
  registrationApi(body:any){
    console.log(body);
      var tempurl= `${this.baseURL}`+`${this.Path}/SelfRegistration`;
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
    var tempurl=`${this.baseURLNew}api/send-otp`;
    return this.http.post(tempurl,body)
  }
  verifyOtp(body:any){
    var tempurl=`${this.baseURLNew}api/verify-otp?otp=${body?.otp}&mobile=91${body?.PhoneNumber}&authkey=318438A60qs5Ysgqr5e47c80dP1`;
    return this.http.get(tempurl);

  }

  getEmailOtp(email:any){
    var tempUrl=`${this.baseURL}`+`${this.Path}/GenerateEmailOTP?Email=${email}`;
    return this.http.get(tempUrl)
  }
  verifyEmailOtp(data:any){
    var tempUrl=`${this.baseURL}`+`${this.Path}/NewconfirmOTP?Email=${data?.email}&otp=${data?.otp}&OrgID=0`;
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
  getLeaderBoardForCoins(data:any){
    var tempurl= `${this.baseURLNew}`+`api/coins-game-log?org_id=${data?.orgId}&id_game=${data?.id_game}`;
    return this.http.get(tempurl,data);
  }
  getOverallLeaderBoard(data:any){
    var tempurl= `${this.baseURLNew}`+`api/overallleaderboard?ID_ORGANIZATION=${data}`;
    return this.http.get(tempurl,data);
  }
  getOverallLeaderBoardCoins(data:any){
    var tempurl= `${this.baseURLNew}`+`api/overallxps?org_id=${data}`;
    return this.http.get(tempurl,data);
  }
  gamePlayAgain(data:any){
    var tempurl= `${this.baseURLNew}`+`api/insertGamePlayedStatus`;
    return this.http.post(tempurl,data);

  }
  getGamePlayStatus(data:any){
    var tempurl= `${this.baseURLNew}`+`api/getGamePlayedStatus/${data?.id_game}/${data.id_user}/${data.org_id}`;
    return this.http.get(tempurl,data);

  }
  updatePassword(data:any){
    var tempurl= `${this.baseURLNew}`+`api/updatePassword`;
    return this.http.post(tempurl,data);

  }
  getLogos(data:any){
    var tempurl= `${this.baseURLNew}organization/logos/${data}`;
    return this.http.get(tempurl)
  }

  checkExistingPhoneNumber(data:any){
    var tempurl= `${this.baseURLNew}checkPhoneNumber?org_id=${data.org_id}&phone_number=${data.emailOrPhone}`;
    return this.http.get(tempurl);
  }

  engagementUserlog(data:any){
    var tempurl= `${this.baseURLNew}`+`addUser`;
    return this.http.post(tempurl,data);

  }

  getAssessmentAttempt(data:any,gameId:any){
    console.log(data,'data');
    var tempurl= `${this.baseURLNew}getAttemptNo?id_user=${data.Id_User}&Id_Game=${gameId}&ID_ORGANIZATION=${data.ID_ORGANIZATION}`;
    return this.http.get(tempurl);
  }
}

