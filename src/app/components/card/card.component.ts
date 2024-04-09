import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { AuthentificationService } from '../../service/authentification.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  @Input() gamesData: any;
  assessmentList: any;
  assesmentData: any;
  profileData: any;
  assesmentDataId: any;
  myProfileData: any;
  gameData: any;
  GamePlayed: number = 0;
  isFrontView: boolean = true;
  GameNewUrl: any;

  constructor(private auth: AuthentificationService,private sanitize:DomSanitizer) {
    this.profileData = localStorage.getItem('ProfileData');
    console.log(this.profileData);
  }

  ngOnInit() {
    // this.UpdateGamePlay('');
    // this.getAssessmentId(this.gamesData);
  }

  openCardById(data: any, isActive: any) {
    console.log(data);
    if (data?.enable_status == 1)
      this.isFrontView = false;
  }

  getGamePlayList(data: any) {
    console.log(data);
    this.myProfileData = JSON.parse(this.profileData);

    let body = {
      "id_game": data?.id_game,
      "id_user": this.myProfileData?.Id_User,
      "org_id": data?.org_id,
      "play_status": 1
    };

    this.auth.getGamePlayStatus(body).subscribe((res) => {
      console.log(res);
    });
  }

  UpdateGamePlay(data: any) {
    this.myProfileData = JSON.parse(this.profileData);
    console.log("gamePlay", data);

    let body = {
      "id_game": data?.id_game,
      "org_id": data?.org_id,
      "play_status": 1,
      "id_user": this.myProfileData?.Id_User
    };

    this.auth.gamePlayAgain(body).subscribe((res) => {
      console.log('playedGameList', res);
    });
  }

  getAssessmentId(data: any) {
    this.auth.getAssesmentId(data).subscribe((res) => {
      console.log(res);
      this.assessmentList = res;
      this.assesmentData = this.assessmentList?.assessments;
      this.assignToUser(this.assesmentData);
      console.log('assessmentData', this.assesmentData);
      
      // Now that this.assesmentData is assigned, you can perform any operations that rely on it.
      // For example, you could call openGame here:
      // this.openGame(this.assesmentData);
    });
  }

  assignToUser(data: any) {
    console.log("AssigntoUser", data);
    this.assesmentData = data;
    this.assesmentDataId = data;
    // console.log(this.assesmentData);
    // localStorage.setItem('assessmentData', JSON.stringify(this.assesmentData));
    this.myProfileData = JSON.parse(this.profileData);
    console.log(this.myProfileData);

    let body = {
      "Id_User": this.myProfileData?.Id_User,
      "Id_Assessment": data?.Id_Assessment,
      "ID_ORGANIZATION": this.myProfileData?.ID_ORGANIZATION,
      "Email": this.myProfileData?.Email,
      "IsActive": "A"
    };

    this.auth.assignAssessmentToUser(body).subscribe((res) => {
      console.log(res);
    });
  }
  openGame(data: any) {
    // Call the API to get assessment data
    this.auth.getAssesmentId(data).subscribe((res: any) => { // Specify 'any' as the type for 'res'
        console.log(res);
        const responseData = res; // Parse the response as JSON
        const assessmentData = responseData?.assessments; // Access 'assessments' property
        console.log('assessmentData', assessmentData);

        // Perform any operations dependent on assessment data here
        // For example, you could construct the URL and open the game

        this.getGamePlayList(data);
        console.log(data);
        this.gameData = data;
        console.log(this.gamesData);
        const gameUrl = data?.game_url;
        this.myProfileData = JSON.parse(this.profileData);
    
        // Construct the URL using assessmentData
        const GameNewUrl = `${gameUrl}?gameassid=${assessmentData[0]?.Id_Assessment}&Email=${this.myProfileData.Email}&OrgID=${this.myProfileData?.ID_ORGANIZATION}&M2ostAssessmentId=0&idgame=${this.gameData?.id_game}&Source=QRGames`;
        window.open(GameNewUrl, '_blank');

      
      
    });
}


  openFrontCard() {
    this.isFrontView = true;
  }
}
