import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgIf, NgClass ,JsonPipe} from '@angular/common';
import { AuthentificationService } from '../../service/authentification.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ExhaustAttemptComponent } from '../dialogs/exhaust-attempt/exhaust-attempt.component';
import { ComingSoonComponent } from '../dialogs/coming-soon/coming-soon.component';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgFor, NgIf, NgClass,JsonPipe,MatDialogModule],
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
  filterData:any=[];
  filterValue:any
  myProfileInfo:any=[];
  id_user_ngage:any;
  filterDataCoins:any;
  filteredData: any;
  filteredDataCoins:any;
  profileInfo: any;
  attemptData:any;
  currentAttempt:any;
  isAttemptModalActive:boolean=false;
  constructor(private auth: AuthentificationService,private sanitize:DomSanitizer,public dialog: MatDialog) {
   
    
  
  }
 
  ngOnInit() {
    // this.UpdateGamePlay('');
    // this.getAssessmentId(this.gamesData);
    this.profileData = localStorage.getItem('ProfileData');
    this.myProfileInfo=JSON.parse(this.profileData);
    console.log(this.myProfileInfo,'myProfile');
  
   
  }

  openCardById(data: any, isActive: any) {
    this.isFrontView=false;
    console.log(data);
    let body = {
        "id_game": data?.id_game,
        "orgId": data?.org_id
    };

    this.auth.getLeaderBoard(body).subscribe((res) => {
        // Assuming res is an array of objects
        this.filterData = res;
      this.filterData=Array.of(this.filterData)
      console.log(this.filterData);
      
        // Find the user in the filtered data
       // Assuming this.filterData is an array and this.myProfileInfo.Id_User is a property containing the user ID to filter
// this.filteredData = this.filterData[0]?.leaderboard.filter((item:any) => item?.id_user === this.myProfileInfo?.Id_User);
// Check if this.filterData[0] and this.filterData[0].leaderboard are defined before filtering
if (this.filterData[0]?.leaderboard) {
  this.filteredData = this.filterData[0].leaderboard.filter((item: any) => item?.id_user === this.myProfileInfo?.Id_User);
} else {
  // Handle the case where this.filterData[0] or this.filterData[0].leaderboard is undefined
  this.filteredData = [];
}

        console.log(this.filteredData);
    });
   
    this.auth.getLeaderBoardForCoins(body).subscribe((res) => {
      // Assuming res is an array of objects
      this.filterDataCoins = res;
      console.log(this.filterDataCoins)
    this.filterDataCoins=Array.of(this.filterDataCoins)
    // console.log(this.filterDataCoins);
    
      // Find the user in the filtered data
     // Assuming this.filterData is an array and this.myProfileInfo.Id_User is a property containing the user ID to filter
    // this.filteredDataCoins = this.filterDataCoins[0]?.game_scores.filter((item:any) => item?.id_user === this.myProfileInfo?.Id_User);
    if (this.filterDataCoins && this.filterDataCoins.length > 0 && this.filterDataCoins[0]?.game_scores) {
      this.filteredDataCoins = this.filterDataCoins[0]?.game_scores.filter((item: any) => item?.id_user === this.myProfileInfo?.Id_User);
  } else {
      // Handle case where this.filterDataCoins or its property is undefined
      this.filteredDataCoins = [];
  }
  
      console.log(this.filteredDataCoins);
  });
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
      
      // this.assignToUser(this.assesmentData);
      // console.log('assessmentData', this.assesmentData);

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
      "Id_Assessment": data,
      "ID_ORGANIZATION": this.myProfileData?.ID_ORGANIZATION,
      "Email": this.myProfileData?.Email,
      "IsActive": "A"
    };

    this.auth.assignAssessmentToUser(body).subscribe((res) => {
      console.log(res);
      
    });
  }
  openExhaustDialog() {
    const dialogRef = this.dialog.open(ExhaustAttemptComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openComingSoonModal() {
    const dialogRef = this.dialog.open(ComingSoonComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getAttempt(gameId:any){
    this.myProfileData=localStorage.getItem(('ProfileData'));
    this.profileInfo=JSON.parse(this.myProfileData);
    console.log('profileData',this.profileInfo);
    this.auth.getAssessmentAttempt(this.profileInfo,gameId).subscribe((res)=>{
      console.log(res);

      this.attemptData=res;
      this.currentAttempt=this.attemptData?.attempt_no;
      console.log("CurrentAttempt",this.currentAttempt);
    })
  }
  openGame(data: any) {
    console.log(data);

    this.auth.getAssesmentId(data).subscribe((res: any) => {
        console.log(res);
        const responseData = res;
        console.log(responseData);

        const assessmentData = responseData?.assessments;
        console.log('assessmentData', assessmentData);

        if (!assessmentData || assessmentData.length === 0) {
            console.error('No assessment data available.');
            return;
        }

        const gameUrl = data?.game_url;
        this.myProfileData = JSON.parse(this.profileData);
        console.log(this.myProfileData);

        const filterAssessmentData = assessmentData.filter((assessment: any) => {
            return assessment.IsActive === 'A';
        });

        console.log(filterAssessmentData[0]?.allow_attempt);

        if (!filterAssessmentData[0]) {
            console.error('No active assessment found.');
            return;
        }

        this.assignToUser(filterAssessmentData[0]?.Id_Assessment);
        this.myProfileData = JSON.parse(this.profileData);
        console.log(filterAssessmentData[0]);

        // Get the attempt data after assigning the user
        this.auth.getAssessmentAttempt(this.myProfileData, filterAssessmentData[0]?.Id_Game).subscribe((attemptRes: any) => {
            console.log(attemptRes);
            this.currentAttempt = attemptRes?.attempt_no;
            console.log("CurrentAttempt", this.currentAttempt);
            console.log("Allow",filterAssessmentData[0].allow_attempt);

            // Ensure currentAttempt and allow_attempt are available and valid numbers
            if (filterAssessmentData[0].allow_attempt > this.currentAttempt) {
                const GameNewUrl = `${gameUrl}?gameassid=${filterAssessmentData[0]?.Id_Assessment}&Email=${this.myProfileData?.Email}&OrgID=${this.myProfileData?.ID_ORGANIZATION}&M2ostAssessmentId=0&idgame=${filterAssessmentData[0]?.Id_Game}&Source=QRGames`;
                window.open(GameNewUrl, '_self');
            }
            else{
              this.openExhaustDialog();
              
            }
        });
    });
}




  openFrontCard() {
    this.isFrontView = true;
  }
}
