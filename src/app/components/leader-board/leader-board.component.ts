import { Component, OnInit, Input } from '@angular/core';
import { NgClass,NgIf,NgFor,JsonPipe } from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AuthentificationService } from '../../service/authentification.service';
import { EarnCoinsComponent } from '../dialogs/earn-coins/earn-coins.component';
import { ScorePointsComponent } from '../dialogs/score-points/score-points.component';


@Component({
  selector: 'app-leader-board',
  standalone: true,
  imports: [NgClass,NgIf,NgFor,JsonPipe,MatTooltipModule, MatDialogModule],
  templateUrl: './leader-board.component.html',
  styleUrl: './leader-board.component.scss'
})
export class LeaderBoardComponent implements OnInit {
 @Input() openSpecificGame:any;
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
  leaderboard: any[]=[];
  selectedValue:any;
  isSpecificgameActive:boolean=true;
  scoreTitle='Coins'

  Overallleaderboard: any[] = [];
  spacificGameLeaderBoardDataForCoins: any;
  isCoinsActiveOverall:boolean=false;
  spacificGameLeaderBoardForCoins: any;
  specificLeaderBoardforCoins:any[]=[];
  // overallGamesLeaderBoard: any[]=[];
  overallGamesLeaderBoard:any;

  overallGameLeaderBoardDataForQuiz: any;
  overallGamesLeaderBoardForCoins: any;
  constructor(public auth:AuthentificationService,public dialog: MatDialog){
    this.isSpecificgameActive=this.auth.isSpecficGamesOpen;
  }
  ngOnInit(): void {
    
 
  this.profileData=localStorage.getItem('ProfileData');

  this.profileInfo=JSON.parse(this.profileData);
  let orgId=this.profileInfo?.ID_ORGANIZATION;
    this.auth.getGameDataList(orgId).subscribe((res)=>{
      this.gameData=res;
      this.GameCard=this.gameData?.games;
    this.selectedValue=this.gameData?.games[0]?.id_game;
   
    //  this.getLeaderDataForSpecificGamesForCoins(this.selectedValue);
  this.openCoinsLeaderboard();
  
      
    })
    this.openOverallCoinsLeaderboard();
    this.getOverallLeaderBoard();

   


  }
 
  onGameSelectionChange(selectedId:any){
    console.log(selectedId.target.value)
    const selectedGame = this.GameCard.find((game:any) => game.id_game === selectedId);
    // this.getGameIdForAssessment(selectedId.target.value);
    // this.getGameIdForGamePlay(selectedId.target.value);
    this.getLeaderBoardDataForSpecificGamesForQuiz(selectedId.target.value);
    this.getLeaderDataForSpecificGamesForCoins(selectedId.target.value);
    this.selectedValue=selectedId.target.value;

     console.log(selectedGame);

  }
  gameActiveIndex=0;
  selectGameForMobile(data:any,index:number){
    console.log(data);
    console.log(index);
    this.gameActiveIndex=index;
    this.getLeaderBoardDataForSpecificGamesForQuiz(data.id_game);
    this.getLeaderDataForSpecificGamesForCoins(data.id_game);

  }

  // getGameIdForAssessment(data:any){
  //   this.idGame=data;
  //   console.log(data)
   
   
  //   // this.openAssessmentLeaderboard(data)
  
   
    

    
 

  // }
  // getGameIdForGamePlay(data:any){
  //   this.idGame=data;
  //   console.log(data)
  //   this.getLeaderDataForSpecificGamesForCoins(data);
  //   // this.openCoinsLeaderboard(data)

  // }

  getLeaderBoardDataForSpecificGamesForQuiz(data:any){
    const body = {
      id_game: data,
      orgId: this.profileInfo?.ID_ORGANIZATION
  };

  this.auth.getLeaderBoard(body).subscribe((res) => {
      this.spacificGameLeaderBoard = res;
    
  });
  
    

  }

  openEarnCoinsInfo() {
    const dialogRef = this.dialog.open(EarnCoinsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openScorePointsInfo(){
    const dialogRef = this.dialog.open(ScorePointsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
  getLeaderDataForSpecificGamesForCoins(data:any){
    const body = {
      id_game: data,
      orgId: this.profileInfo?.ID_ORGANIZATION
  };

  this.auth.getLeaderBoardForCoins(body).subscribe((res) => {
      this.spacificGameLeaderBoard = res;
      console.log('specific',this.spacificGameLeaderBoard);
    
      
    
      this.spacificGameLeaderBoardDataForCoins =this.spacificGameLeaderBoard;
      
      
    
  });
  
    

  }
  
  

  getOverallLeaderBoard(){
   
    // this.profileInfo?.ID_ORGANIZATION
    this.auth.getOverallLeaderBoard(this.profileInfo?.ID_ORGANIZATION).subscribe((res)=>{
      this.overallGamesLeaderBoard = res;
      console.log(this.overallGamesLeaderBoard?.leaderboard);
    
      
      
    
  
    })
  }
  getOverallLeaderBoardCoins(){
    this.auth.getOverallLeaderBoardCoins(this.profileInfo?.ID_ORGANIZATION).subscribe((res)=>{
      this.overallGamesLeaderBoardForCoins=res;
      console.log(this.overallGamesLeaderBoardForCoins)
    })

  }



  openSpecificGames() {
    console.log(this.idGame)
    this.showSpecificGames = true;
    // this.getLeaderBoardDataForSpecificGamesForQuiz(data);
    this.openCoinsLeaderboard();

    this.getLeaderDataForSpecificGamesForCoins(this.selectedValue);
    this.getLeaderBoardDataForSpecificGamesForQuiz(this.selectedValue)
    
}
  openOverallGames(){
    console.log(this.openOverallGames)
    this.showSpecificGames=false;
    this.openOverallCoinsLeaderboard();
  }
  openCoinsLeaderboard(){
    this.isCoinsActive=true;
    this.scoreTitle="Coins"
    // this.getGameIdForAssessment(selectedValue);
    this.getLeaderDataForSpecificGamesForCoins(this.selectedValue);
    this.getLeaderBoardDataForSpecificGamesForQuiz(this.selectedValue);
  }
  openOverallCoinsLeaderboard(){
    this.isCoinsActiveOverall=true;
    this.scoreTitle="Coins";

    this.getOverallLeaderBoardCoins();

  }
  openOverallAssessmentLeaderBoard(){
    this.scoreTitle="Points";
    this.isCoinsActiveOverall=false;
    this.getOverallLeaderBoard();
  }

  openAssessmentLeaderboard(){
    this.isCoinsActive=false;
    this.scoreTitle="Points";
    // this.getGameIdForGamePlay(this.gameData?.games[0]?.id_game);
    this.getLeaderBoardDataForSpecificGamesForQuiz(this.selectedValue);
   
  }

}
