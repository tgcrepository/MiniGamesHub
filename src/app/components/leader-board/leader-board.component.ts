import { Component, OnInit } from '@angular/core';
import { NgClass,NgIf,NgFor,JsonPipe } from '@angular/common';
import { AuthentificationService } from '../../service/authentification.service';

@Component({
  selector: 'app-leader-board',
  standalone: true,
  imports: [NgClass,NgIf,NgFor,JsonPipe],
  templateUrl: './leader-board.component.html',
  styleUrl: './leader-board.component.scss'
})
export class LeaderBoardComponent implements OnInit {
  showSpecificGames:boolean=true;
  isCoinsActive:boolean=true;
  profileData: any;
  profileInfo:any;
  spacificGameLeaderBoard:any;
  specificLeaderBoard: any=[];
  spacificGameLeaderBoardData: any;
  gameData: any;
  GameCard: any;
  idGame: any;
  constructor(private auth:AuthentificationService){

  }
  ngOnInit(): void {
  this.profileData=localStorage.getItem('ProfileData');
  this.profileInfo=JSON.parse(this.profileData);
 
  let orgId='18'
    this.auth.getGameDataList(orgId).subscribe((res)=>{
      this.gameData=res;
      this.GameCard=this.gameData?.games;
      this.idGame=this.GameCard?.id_game;

      console.log(this.GameCard);
    
      
    })
  
   
  }
  leaderboard: any;
  Overallleaderboard: any[] = [
    {
      rank: 1,
      playerName: "Kartikee Pawar",
      gameLogoSrc: "assets/GameImages/qrgamewebsiteassets/Apple king.png",
      points: 2000,
      rankImageSrc: "assets/GameImages/qrgamewebsiteassets/1.png" // Add rank 1 image source
    },
    {
      rank: 2,
      playerName: "Shubham Dhekolkar",
      gameLogoSrc: "assets/GameImages/qrgamewebsiteassets/Apple king.png",
      points: 1800,
      rankImageSrc: "assets/GameImages/qrgamewebsiteassets/2.png" // Add rank 2 image source
    },
    {
      rank: 3,
      playerName: "Swapnil Chawan",
      gameLogoSrc: "assets/GameImages/qrgamewebsiteassets/Apple king.png",
      points: 1750,
      rankImageSrc: "assets/GameImages/qrgamewebsiteassets/3.png" // Add rank 3 image source
    },

    {
      rank: 4,
      playerName: "Amarjeet",
      gameLogoSrc: "assets/GameImages/qrgamewebsiteassets/Apple king.png",
      points: 2000,
      rankImageSrc: "assets/GameImages/qrgamewebsiteassets/1.png" // Add rank 1 image source
    },
    {
      rank: 5,
      playerName: "Madhu",
      gameLogoSrc: "assets/GameImages/qrgamewebsiteassets/Apple king.png",
      points: 1800,
      rankImageSrc: "assets/GameImages/qrgamewebsiteassets/2.png" // Add rank 2 image source
    },
    {
      rank: 6,
      playerName: "Sanjana",
      gameLogoSrc: "assets/GameImages/qrgamewebsiteassets/Apple king.png",
      points: 1750,
      rankImageSrc: "assets/GameImages/qrgamewebsiteassets/3.png" // Add rank 3 image source
    }
  ];

  getGameId(data:any){
    this.idGame=data;

  }
  
  openSpecificGames() {
  
    this.showSpecificGames = true;
    
    
    const body = {
        id_game: 11,
        orgId: this.profileInfo?.ID_ORGANIZATION
    };

    this.auth.getLeaderBoard(body).subscribe((res) => {
        this.spacificGameLeaderBoard = res;
        console.log('specific',this.spacificGameLeaderBoard);
      
        
      
        this.spacificGameLeaderBoardData = this.spacificGameLeaderBoard?.leaderboard.map((element: any) => {
            let userInfo = {
                id_game: '11',
                orgId: this.profileInfo?.ID_ORGANIZATION,
                id_user: element?.id_user
            };

           
            this.auth.getLeaderBoardInfo(userInfo).subscribe((res) => {
              return this.specificLeaderBoard.push(res);
                
            });

           
            return element;
        });
        
      
    });
}


  openOverallGames(){
    this.showSpecificGames=false;
  }
  openCoinsLeaderboard(){
    this.isCoinsActive=true;
    
  }
  openAssessmentLeaderboard(){
    this.isCoinsActive=false;
    
  }

}
