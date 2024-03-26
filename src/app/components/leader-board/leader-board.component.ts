import { Component } from '@angular/core';
import { NgClass,NgIf,NgFor } from '@angular/common';

@Component({
  selector: 'app-leader-board',
  standalone: true,
  imports: [NgClass,NgIf,NgFor],
  templateUrl: './leader-board.component.html',
  styleUrl: './leader-board.component.scss'
})
export class LeaderBoardComponent {
  showSpecificGames:boolean=true;
  isCoinsActive:boolean=true;
  leaderboard: any[] = [
    {
      rank: 1,
      playerName: "Shubham Karad",
      gameLogoSrc: "assets/GameImages/qrgamewebsiteassets/Apple king.png",
      points: 200,
      rankImageSrc: "assets/GameImages/qrgamewebsiteassets/1.png" // Add rank 1 image source
    },
    {
      rank: 2,
      playerName: "Sayali Powar",
      gameLogoSrc: "assets/GameImages/qrgamewebsiteassets/Apple king.png",
      points: 150,
      rankImageSrc: "assets/GameImages/qrgamewebsiteassets/2.png" // Add rank 2 image source
    },
    {
      rank: 3,
      playerName: "Rajat Bhat",
      gameLogoSrc: "assets/GameImages/qrgamewebsiteassets/Apple king.png",
      points: 130,
      rankImageSrc: "assets/GameImages/qrgamewebsiteassets/3.png" // Add rank 3 image source
    }
  ];
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
    }
  ];
  openSpectificGames(){
    this.showSpecificGames=true
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
