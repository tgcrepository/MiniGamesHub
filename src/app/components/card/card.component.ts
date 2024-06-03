import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgIf, NgClass ,JsonPipe} from '@angular/common';
import { AuthentificationService } from '../../service/authentification.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgFor, NgIf, NgClass,JsonPipe],
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
  constructor(private auth: AuthentificationService,private sanitize:DomSanitizer) {
   
    
  
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
  openGame(data: any) {
    // Call the API to get assessment data
    console.log(data)
    this.auth.getAssesmentId(data).subscribe((res: any) => { // Specify 'any' as the type for 'res'
        console.log(res);
        const responseData = res; // Parse the response as JSON
        console.log(responseData)
        const assessmentData = responseData?.assessments; // Access 'assessments' property
        console.log('assessmentData', assessmentData);

        // Perform any operations dependent on assessment data here
        // For example, you could construct the URL and open the game

        // this.getGamePlayList(data);
        console.log(data);
        this.gameData = data;
        console.log(this.gamesData);
        const gameUrl = data?.game_url;
        this.myProfileData = JSON.parse(this.profileData);
        console.log(this.myProfileData)
        console.log(assessmentData);
        const filterAssessmentData = assessmentData.filter((res: any) => {
          return res.IsActive === 'A';
      });
      
      console.log(filterAssessmentData);
      
       
        this.assignToUser(filterAssessmentData[0]?.Id_Assessment);
    
       
        // console.log(this.assesmentData);
       
        this.myProfileData = JSON.parse(this.profileData);
        console.log(this.myProfileData);
    
        // let body = {
        //   "Id_User": this.myProfileData?.Id_User,
        //   "Id_Assessment": assessmentData[0]?.Id_Assessment,
        //   "ID_ORGANIZATION": this.myProfileData?.ID_ORGANIZATION,
        //   "Email": this.myProfileData?.Email,
        //   "IsActive": "A"
        // };
    
        // this.auth.assignAssessmentToUser(body).subscribe((res) => {
        //   console.log(res);
        
        // });
        
        const GameNewUrl = `${gameUrl}?gameassid=${filterAssessmentData[0]?.Id_Assessment}&Email=${this.myProfileData?.Email}&OrgID=${this.myProfileData?.ID_ORGANIZATION}&M2ostAssessmentId=0&idgame=${this.gameData?.id_game}&Source=QRGames`;
        window.open(GameNewUrl, '_self');
      
      
    });
}


  openFrontCard() {
    this.isFrontView = true;
  }
}
