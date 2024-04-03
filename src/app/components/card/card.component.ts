import { Component,Input, OnInit } from '@angular/core';

import { NgFor,NgIf,NgClass } from '@angular/common';
import { AuthentificationService } from '../../service/authentification.service';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgFor,NgIf,NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  @Input() gamesData:any;
  assessmentList:any;
  assesmentData: any;
  profileData: any;
  myProfileData: any;
  constructor(private auth:AuthentificationService){}
  ngOnInit() {
    this.profileData=localStorage.getItem('ProfileData');
    console.log(this.profileData);
   
  }
  isFrontView:boolean=true;

  openCardById(data:any,isActive:any){
    
    console.log(data)
    if(isActive==1)
    this.isFrontView=false;

  }
  getAssessmentId(data:any){
    console.log("GetAssessmentId")
    this.auth.getAssesmentId(data).subscribe((res)=>{
      console.log(res);
      this.assessmentList=res;
      this.assesmentData=this.assessmentList?.assessments[0];
      this.assignToUser(this.assesmentData)
      console.log(this.assesmentData);
     
    })
  }
  assignToUser(data:any){
    console.log("AssigntoUser",data);
   
    this.myProfileData=JSON.parse(this.profileData);
    console.log(this.myProfileData);

    let body={
      "Id_User": this.myProfileData?.Id_User,
      "Id_Assessment": data?.Id_Assessment,
      "ID_ORGANIZATION": this.myProfileData?.ID_ORGANIZATION,
      "Email":this.myProfileData?.Email,
      "IsActive": "A"
  }
    this.auth.assignAssessmentToUser(body).subscribe((res)=>{
      console.log(res);
      alert("AssesmentAssign Successfully")
    })
  }
  openGame(data:any){

    this.getAssessmentId(data)

   

    const gameUrl=data?.game_url;
    this.myProfileData=JSON.parse(this.profileData);
    console.log(this.myProfileData);
    const GameNewUrl=`${gameUrl}&Email=${this.myProfileData.Email}&OrgID=${data?.org_id}&M2ostAssessmentId=0&idgame=${data.id_game}&Source=QRGames`
   console.log(GameNewUrl);

    // console.log(gameUrl?Email=bata402_BA&OrgID=15&M2ostAssessmentId=478&idgame=11&gameassid=15);
    
    window.open(GameNewUrl,'_blank')
   


  }
  openFrontCard(){
    this.isFrontView=true;

  }
}
